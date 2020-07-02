import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PersonModel} from "../../models/PersonModel";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonService} from "../../services/person.service";
import {ToastrService} from "ngx-toastr";

declare interface SelectRowInterface {
  productId: string;
  productName: string;
}

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
  public headerRow: string[];
  selectedRowData: SelectRowInterface;
  dataRows: PersonModel[] = [];
  editForm: FormGroup;
  register: FormGroup;
  closeResult = '';

  constructor(private fb: FormBuilder, private modalService: NgbModal, private toastr: ToastrService,
              private personService: PersonService) {
    this.editForm = this.fb.group({
      id: new FormControl(),
      nombres: new FormControl(),
      apellidos: new FormControl(),
      edad: new FormControl(),
      pais: new FormControl(),
      departamento: new FormControl(),
      municipio: new FormControl(),
      direccion: new FormControl(),
      email: new FormControl()
    });
  }

  ngOnInit() {
    this.headerRow = ['Identificación', 'Nombre', 'Edad', 'Municipio', 'Email', 'Acciones'];

    this.register = this.fb.group({
      id: ['', [Validators.required, Validators.maxLength(13), Validators.pattern('^[0-9 ]*$')]],
      nombres: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      apellidos: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      edad: ['', [Validators.required]],
      pais: ['', [Validators.required, Validators.maxLength(50)]],
      departamento: ['', [Validators.required , Validators.maxLength(50)]],
      municipio: ['', [Validators.required, Validators.maxLength(50)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]]
    });
    this.loadPersons();
  }

  loadPersons() {
    this.personService.GetPersons().subscribe(value => {
      this.dataRows = [...value]; // Refresh the data
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  editRow(row) {
    this.editForm.setValue({
      id: row.id,
      nombres: row.nombres,
      apellidos: row.apellidos,
      edad: row.edad,
      pais: row.pais,
      departamento: row.departamento,
      municipio: row.municipio,
      direccion: row.direccion,
      email: row.email
    });
    this.selectedRowData = row;
  }

  deleteRow(row) {
    this.personService.DeletePerson(row.id).subscribe(value => {
        this.showNotification(2, 'top', 'center', 'Persona eliminada');
        this.loadPersons();
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  open(content, form, row) {
    if (form)
      this.editRow(row);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onAddRowSave(form: FormGroup) {
    this.personService.CreatePerson(form.value).subscribe(value => {
      if (value){
        if (value.nombres === form.value.nombres) {
          this.loadPersons();
          form.reset();
          this.modalService.dismissAll();
          this.showNotification(2, 'top', 'center', 'Persona guardada');
        }
      }
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  onEditSave(form: FormGroup) {
    this.personService.UpdatePerson(form.value).subscribe(value => {
      if (value){
        if (value.id === form.value.id) {
          this.loadPersons();
          form.reset();
          this.modalService.dismissAll();
          this.showNotification(2, 'top', 'center', 'Persona modificada');
        }
      }
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showNotification(opc, from, align, text) {
    switch (opc) {
      case 1:
        this.toastr.info(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+ text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 2:
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+ text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 3:
        this.toastr.warning(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+ text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 4:
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+ text + '</b></span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 5:
        this.toastr.show(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+ text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      default:
        break;
    }
  }

}
