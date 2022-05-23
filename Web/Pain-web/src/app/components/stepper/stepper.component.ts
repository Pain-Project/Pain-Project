import {Component, OnInit, Input, Output} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from "@angular/forms";
import {Config, Destination} from "../../models/config.model";
import {Client} from "../../models/client.model";
import {ClientsService} from "../../services/clients.service";
import {ConfigsService} from "../../services/configs.service";
import {LoginService} from "../../services/login.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  searchClient: FormControl = new FormControl('');
  clients: Client[] = [];
  retentionSwitch = false;
  frequentionBasic = true;
  ftpError = false;

  //full ; diff ; inc
  backup = 'full'

  //daily ; weekly ; monthly
  frequention = 'daily'

  PlainText = true;
  searchActive = false;
  @Input()
  public form: FormGroup;

  @Output()
  public formArray: FormArray

  public config: Config = new Config();

  tempDest: Destination[] = [{destType: "drive", path: ""}]
  tempClients = new Map(null);
  tempClient = {1: 'ads'};
  tempDaysWeek: number[] = [];
  tempMonth: number;


  constructor(private fb: FormBuilder,
              private service: ClientsService,
              private configService: ConfigsService,
              private loginService: LoginService,
              private router: Router) {
    // @ts-ignore
    delete this.tempClient[1]
  }


  ngOnInit(): void {
    this.form = this.CreateForm(this.config);
    this.service.findAllClients().subscribe(x => this.clients = x.filter(x => x.active == true))
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

    var config: Config = new Config();
    var secondStep: SecondStep = this.form.controls['formArray'].value[1];

    config.cron = this.BuildCron();
    config.clientNames = this.tempClient;

    config.name = this.Name?.value;
    config.backUpType = secondStep.backupType;
    config.idAdministrator = this.loginService.GetLogin().Id;
    config.retentionPackageSize = config.backUpType == 'FB' ? 1 : secondStep.packages;
    config.retentionPackages = secondStep.backups;
    config.backUpFormat = secondStep.backupFormat;

    for (let source of this.Sources.value) {
      config.sources.push(source.path);
    }
    let re = RegExp("^(ftp:\\/\\/)[A-Za-z0-9\\-_.]{1,}:[A-Za-z0-9?\\-_.:]{1,}@[A-Za-z0-9\\/\\-_/:.]{1,}$");
    for (let dest of this.Dest.value) {
      if (dest.type == "FTP" && !re.test(dest.path)) {
        this.ftpError = true;
        return
      }

      let destination: Destination = {destType: dest.type, path: dest.path}
      config.destinations.push(destination);
    }
    // if (!this.form.valid) {
    //   alert("You must fill all inputs!")
    //   return;
    // }
    this.configService.sendConfig(config).subscribe(() => (this.router.navigateByUrl('/ui/dashboard'), alert('Config was succesfully created!')));
  }

  private BuildCron(): string {
    let cron = '';
    var secondStep: SecondStep = this.form.controls['formArray'].value[1];
    var minutes = secondStep.frequency.split(':');

    if (this.frequentionBasic) {
      if (this.frequention == 'daily') {
        cron = `${minutes[1]} ${minutes[0]} * * *`
      } else if (this.frequention == 'weekly') {
        var days = ''
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
          clients: new FormArray([])
        }),
        this.fb.group({
          backupType: ['FB', Validators.required],
          backupFormat: ['PT', Validators.required],
          frequency: ['12:00', Validators.required],
          minute: ['*', Validators.required],
          hour: ['*', Validators.required],
          dayM: ['*', Validators.required],
          month: ['*', Validators.required],
          dayW: ['*', Validators.required],
          dayOfMonth: [0, Validators.required],
          packages: [0, Validators.required],
          backups: [0, Validators.required],
        }),
        this.fb.group({
          sources: this.fb.array([this.fb.group({
            path: ['', Validators.required]
          })]),
          destinations: this.fb.array([this.fb.group({
            type: ['DRIVE', Validators.required],
            path: ['', Validators.required]
          })]),
          configName: ['', Validators.required],
        }),
        this.fb.group({
          name: [config.name, Validators.required]
        })
      ])
    })
  }

  get Sources() {
    var test = this.form.controls['formArray'] as FormArray;
    var test2 = test.controls[2].get('sources') as FormArray;
    return test2 as FormArray;
  }

  get Name() {
    var test = this.form.controls['formArray'] as FormArray;
    return test.controls[2].get('configName')
  }

  get Dest() {
    var test = this.form.controls['formArray'] as FormArray;
    var test2 = test.controls[2].get('destinations') as FormArray;
    return test2 as FormArray;
  }

  public addSource(): void {
    const sourceTest = this.fb.group({path: ['', Validators.required]})
    this.Sources.push(sourceTest);
  }

  public removeSource(index: number): void {
    this.Sources.removeAt(index);
  }

  public addDest(): void {
    const destTest = this.fb.group({
      type: ['DRIVE', Validators.required],
      path: ['', Validators.required]
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
