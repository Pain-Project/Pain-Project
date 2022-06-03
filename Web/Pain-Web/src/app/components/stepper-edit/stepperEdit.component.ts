import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from "@angular/forms";
import {Config, Destination} from "../../models/config.model";
import {Client} from "../../models/client.model";
import {ClientsService} from "../../services/clients.service";
import {ConfigsService} from "../../services/configs.service";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import * as moment from "moment";

@Component({
  selector: 'app-stepperEdit',
  templateUrl: './stepperEdit.component.html',
  styleUrls: ['./stepperEdit.component.scss']
})
export class StepperEditComponent implements OnInit {
  searchClient: FormControl = new FormControl('');
  clients: Client[] = [];
  frequentionBasic = false;

  //full ; diff ; inc
  backup = 'full'

  //daily ; weekly ; monthly
  frequention = 'daily'

  searchActive = false;
  public form: FormGroup;
  @Input()
  public config: Config

  @Output()
  public formArray: FormArray


  tempDest: Destination[] = [{destType: "drive", path: ""}]
  tempClient = {1: 'ads'};
  tempDaysWeek: number[] = [];
  tempMonth: number;

  CronTempMin: string;
  CronTempHour: string;
  CronTempDayM: string;
  CronTempMonth: string;
  CrontempDayW: string;

  constructor(private fb: FormBuilder,
              private service: ClientsService,
              private configService: ConfigsService,
              private loginService: LoginService,
              private router: Router) {
    // @ts-ignore
    delete this.tempClient[1]
    // @ts-ignore
    this.config = this.router.getCurrentNavigation()?.extras.state
    if (this.config == null) {
      this.router.navigateByUrl('/ui/dashboard')
    }
    //@ts-ignore
    this.tempClient = this.config.clientNames == null ? {} : this.config.clientNames;
    let cron = this.config.cron.split(' ');
    this.CronTempMin = cron[0];
    this.CronTempHour = cron[1];
    this.CronTempDayM = cron[2];
    this.CronTempMonth = cron[3];
    this.CrontempDayW = cron[4];
    if (this.config.backUpType != 'FB')
      this.backup = 'huhu'
  }


  ngOnInit(): void {
    this.form = this.CreateForm(this.config);
    this.service.findAllClients().subscribe(x => this.clients = x.filter(x => x.active == true))
    for (let source of this.config.sources) {
      this.addSource(source);
    }
    for (let dest of this.config.destinations) {
      this.addDest(dest);
    }
    console.log(this.Sources);
    console.log(this.Dest);
  }

  public isChecked(id: number): boolean {
    return this.tempClient.hasOwnProperty(id);
  }

  public AddRemoveClient(id: number): void {

    if (this.tempClient.hasOwnProperty(id)) {
      // @ts-ignore
      delete this.tempClient[id]
    } else {
      // @ts-ignore
      this.tempClient[id] = ''
    }
  }

  public AddRemoveDayWeek(id: number): void {
    if (this.tempDaysWeek.find(x => x == id))
      this.tempDaysWeek.splice(this.tempDaysWeek.indexOf(id), 1);
    else
      this.tempDaysWeek.push(id);
  }

  public Submit(): void {

    if (Object.keys(this.tempClient).length == 0) {
      alert("No clients selected!")
      return
    }
    if (this.frequention == 'weekly' && this.tempDaysWeek.length == 0) {
      alert("You must select days of week!")
      return
    }
    let config: Config = new Config();
    let secondStep: SecondStep = this.form.controls['formArray'].value[1];

    if (this.frequention == 'monthly' && secondStep.dayOfMonth < 1 || secondStep.dayOfMonth > 31) {
      alert("Please select valid day of month!")
      return
    }
    if (secondStep.backups < 1 || (secondStep.packages < 1 && secondStep.backupType != 'FB')) {
      alert("Please enter valid retention!")
      return
    }
    if (this.Sources.value.length == 0) {
      alert("Please enter source!")
      return
    }
    if (this.Dest.value.length == 0) {
      alert("Please enter destination!")
      return
    }

    config = this.config
    config.createDate = moment(this.config.createDate).format();
    config.cron = this.BuildCron();
    config.clientNames = this.tempClient;
    config.backUpType = secondStep.backupType;
    config.idAdministrator = this.loginService.GetLogin().Id;
    config.retentionPackageSize = secondStep.packages;
    config.retentionPackages = secondStep.backups;
    config.backUpFormat = secondStep.backupFormat;
    config.sources = [];
    config.destinations = [];

    let re = RegExp("^(ftp:\\/\\/)[A-Za-z0-9\\-_.]{1,}:[A-Za-z0-9?\\-_.:]{1,}@[A-Za-z0-9\\/\\-_/:.]{1,}$");
    for (let source of this.Sources.value) {
      if (source.path == '' || !RegExp(`((?!\\?|\\\\|\\/|\\:|\\*|\\"|\\<|\\>|\\|).)+`).test(source.path)) {
        alert("Please enter valid source!")
        return
      }
      if (config.sources.find(x => x == source.path)) {
        alert("All sources must be unique!")
        return
      }
      config.sources.push(source.path);
    }
    for (let dest of this.Dest.value) {
      if (dest.type == "FTP" && !re.test(dest.path)) {
        alert("Please enter valid FTP pattern!")
        return
      }
      if (dest.type == 'DRIVE' && !RegExp(`((?!\\?|\\\\|\\/|\\:|\\*|\\"|\\<|\\>|\\|).)+`).test(dest.path)) {
        alert("Please enter valid destination!")
        return
      }

      if (dest.path == '') {
        alert("Please enter valid destination!")
        return
      }
      if (config.destinations.find(x => x == dest.path)) {
        alert("All destinations must be unique!")
        return
      }
      let destination: Destination = {destType: dest.type, path: dest.path}
      config.destinations.push(destination);
    }
    this.configService.updateConfig(config).subscribe(() => this.router.navigateByUrl('/ui/dashboard'));
  }

  private BuildCron(): string {
    let cron = '';
    let secondStep: SecondStep = this.form.controls['formArray'].value[1];
    let minutes = secondStep.frequency.split(':');

    if (this.frequentionBasic) {
      if (this.frequention == 'daily') {
        cron = `${minutes[1]} ${minutes[0]} * * *`
      } else if (this.frequention == 'weekly') {
        let days = ''
        for (let day of this.tempDaysWeek) {
          switch (day) {
            case 1:
              days += '1,'
              break
            case 2:
              days += '2,'
              break
            case 3:
              days += '3,'
              break
            case 4:
              days += '4,'
              break
            case 5:
              days += '5,'
              break
            case 6:
              days += '6,'
              break
            case 7:
              days += '0,'
              break
          }
        }
        days = days.slice(0, -1);
        cron = `${minutes[1]} ${minutes[0]} * * ${days}`
      } else {
        cron = `${minutes[1]} ${minutes[0]} ${secondStep.dayOfMonth} * *`
      }
    } else {
      cron = `${secondStep.minute} ${secondStep.hour} ${secondStep.dayM} ${secondStep.month} ${secondStep.dayW}`
    }
    return cron;
  }


  private CreateForm(config: Config): FormGroup {
    return this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          clients: [config.clientNames, Validators.required]
        }),
        this.fb.group({
          backupType: [config.backUpType, Validators.required],
          backupFormat: [config.backUpFormat, Validators.required],
          frequency: ['12:00', Validators.required],
          minute: [this.CronTempMin, Validators.required],
          hour: [this.CronTempHour, Validators.required],
          dayM: [this.CronTempDayM, Validators.required],
          month: [this.CronTempMonth, Validators.required],
          dayW: [this.CrontempDayW, Validators.required],
          dayOfMonth: [0, Validators.required],
          packages: [this.config.retentionPackageSize, Validators.required],
          backups: [this.config.retentionPackages, Validators.required],
        }),
        this.fb.group({
          sources: this.fb.array([]),
          destinations: this.fb.array([]),
          configName: ['', Validators.required],
        }),
        this.fb.group({
          name: [config.name, Validators.required]
        })
      ])
    })
  }

  get Sources() {
    let test = this.form.controls['formArray'] as FormArray;
    let test2 = test.controls[2].get('sources') as FormArray;
    return test2 as FormArray;
  }

  get Name() {
    let test = this.form.controls['formArray'] as FormArray;
    return test.controls[2].get('configName')
  }

  get Dest() {
    let test = this.form.controls['formArray'] as FormArray;
    let test2 = test.controls[2].get('destinations') as FormArray;
    return test2 as FormArray;
  }

  public addSource(path: string): void {
    const sourceTest = this.fb.group({path: [path, Validators.required]})
    this.Sources.push(sourceTest);
  }

  public removeSource(index: number): void {
    this.Sources.removeAt(index);
  }

  public addDest(dest: Destination): void {
    const destTest = this.fb.group({
      type: [dest.destType, Validators.required],
      path: [dest.path, Validators.required]
    })
    this.Dest.push(destTest);
  }

  public removeDest(index: number): void {
    this.Dest.removeAt(index);
  }

}

export interface SecondStep {
  backupType: any,
  retention: any,
  backupFormat: any,
  frequency: any
  minute: any,
  hour: any,
  dayM: any,
  month: any,
  dayW: any,
  dayOfMonth: any,
  packages: any,
  backups: any,
}
