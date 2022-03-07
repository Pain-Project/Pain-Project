import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from "@angular/forms";
import { Config, Destination } from "../../models/config.model";
import { Client } from "../../models/client.model";
import { ClientsService } from "../../services/clients.service";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  searchClient : FormControl = new FormControl('');
  clients : Client[] = [];
  retentionSwitch = false;
  frequentionBasic = true;

  //full ; diff ; inc
  backup = 'full'

  //daily ; weekly ; monthly
  frequention = 'daily'

  PlainText = true;
  searchActive = false;
  @Input()
  public form :FormGroup;

  @Output()
  public formArray :FormArray
  public Formevent: EventEmitter<void> = new EventEmitter<void>()

  public config: Config = new Config();
  tempSources :string[] = [""]
  public addSource() :void{
    this.tempSources.push("")
  }
  tempDest :Destination[] = [{type :"drive",destination :""}]
  public addDest() :void{
    this.tempDest.push({type :"drive",destination :""})
  }
  constructor(private fb: FormBuilder, private service : ClientsService) {}
  //get formArray(): AbstractControl | null { return this.form.get('formArray'); }

  ngOnInit(): void {
    this.form = this.CreateForm(this.config);
    this.clients  = this.service.findAllClients();
  }
  private CreateForm(config: Config):FormGroup{
    return this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          clients :[config.PCs, Validators.required]
        }),
        this.fb.group({
          backupType :[config.backup_type, Validators.required],
          retention :[config.retention, Validators.required],
          backupFormat :[config.backup_format, Validators.required],
          frequency :[config.frequency, Validators.required]
        }),
        this.fb.group({
          sources :[config.sources, Validators.required],
          destinations :[config.destinations, Validators.required]
        }),
        this.fb.group({
          name :[config.name, Validators.required]
        })
      ])
    })
  }
}
