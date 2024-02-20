import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {DiseaseService} from "../../services/disease.service";
import {HttpClient, HttpHandler} from "@angular/common/http";

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
  ],
  providers: [DiseaseService],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})

export class PredictionComponent implements OnInit{
  predictionForm: FormGroup;
  inputControls = [
    { label: 'Name', controlName: 'input1', type: 'text', placeholder: 'Enter your name', minLength: 3, maxLength: 50 },
    { label: 'Age', controlName: 'input2', type: 'number', placeholder: 'Enter your age' , min: 18, max: 100},
    { label: 'MDVP: Fo(Hz)', controlName: 'input3', type: 'number', placeholder: 'Enter MDVP: Fo(Hz)', min: 0, max: 1000 },
    { label: 'MDVP: Flo(Hz)', controlName: 'input4', type: 'number', placeholder: 'Enter MDVP: Flo(Hz)', min: 0, max: 1000 },
    { label: 'MDVP:Shimmer', controlName: 'input5', type: 'number', placeholder: 'Enter MDVP:Shimmer' , min: 0, max: 1000},
    { label: 'Shimmer: APQ5', controlName: 'input6', type: 'number', placeholder: 'Enter Shimmer: APQ5', min: 0, max: 1000 },
    { label: 'MDVP:APQ', controlName: 'input7', type: 'number', placeholder: 'Enter MDVP:APQ', min: 0, max: 1000 },
    { label: 'HNR', controlName: 'input8', type: 'number', placeholder: 'Enter HNR', min: 0, max: 1000 },
    { label: 'spread1', controlName: 'input9', type: 'number', placeholder: 'Enter spread1', max: 1000 },
    { label: 'spread2', controlName: 'input10', type: 'number', placeholder: 'Enter spread2', min: 0, max: 1000},
    { label: 'D2', controlName: 'input11', type: 'number', placeholder: 'Enter D2', min: 0, max: 1000 },
    { label: 'PPE', controlName: 'input12', type: 'number', placeholder: 'Enter PPE', min: 0, max: 1000 }
  ];
  predictionResult: any;
  constructor(private formBuilder: FormBuilder, private service: DiseaseService) { }
  ngOnInit(): void {
    this.predictionForm = this.formBuilder.group({
      input1: ['', [Validators.required, Validators.minLength(3)], [Validators.maxLength(50)]],
      input2: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      input3: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      input4: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      input5: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      input6: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      input7: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      input8: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      input9: ['', [Validators.required, Validators.max(1000)]],
      input10: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      input11: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
      input12: ['', [Validators.required, Validators.min(0), Validators.max(1000)]]
    });
  }

  onSubmit() {
    this.predictionForm.markAllAsTouched();
    if (this.predictionForm.invalid) {
      // Handle form validation errors
      console.log('Form validation failed');
    } else {
      const data: number[] = []
      // extract form data without the name and age
      for (let i = 3; i < 13; i++) {
        data.push(Number(this.predictionForm.get('input' + i).value));
      }
      const postData = [data];
      this.service.predict(postData).subscribe((response:any) => {
        this.predictionResult = response.prediction;
        this.predictionForm.reset();
      });
    }
  }
}
