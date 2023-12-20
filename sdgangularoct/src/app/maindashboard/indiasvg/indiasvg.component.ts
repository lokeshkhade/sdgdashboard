import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-indiasvg',
  templateUrl: './indiasvg.component.html',
  styleUrls: ['./indiasvg.component.scss']
})
export class IndiasvgComponent implements OnInit {

  @Input() item = ''; // decorate the property with @Input()
  
  public indiasvg: FormGroup; //add  FormGroup  

  public MadhyaPradesh :any;
  public MadhyaPradeshT: any;

  public UttarPradesh: any;
  public UttarPradeshT: any;

  public Karnataka: any;
  public KarnatakaT: any;

  public Nagaland: any;
  public NagalandT: any;

  public Bihar: any;
  public BiharT: any;

  public Lakshadweep: any;
  public LakshadweepT: any;

  public AndamanandNicobar: any;
  public AndamanandNicobarT: any;

  public Assam: any;
  public AssamT: any;  

  public WestBengal: any;
  public WestBengalT: any;

  public Puducherry: any;
  public PuducherryT: any;

  public DamanandDiu: any;
  public DamanandDiuT: any;

  public Gujarat: any;
  public GujaratT: any;

  public Rajasthan: any;
  public RajasthanT: any; 

  public DadraandNagarHaveli: any;
  public DadraandNagarHaveliT: any;

  public Chhattisgarh: any;
  public ChhattisgarhT: any;

  public TamilNadu: any;
  public TamilNaduT: any;

  public Chandigarh: any;
  public ChandigarhT: any;

  public Punjab: any;
  public PunjabT: any;

  public Haryana: any;
  public HaryanaT: any;

  public AndhraPradesh: any;
  public AndhraPradeshT: any;  

  public Maharashtra: any;
  public MaharashtraT: any;

  public HimachalPradesh: any;
  public HimachalPradeshT: any;

  public Meghalaya: any;
  public MeghalayaT: any;

  public Kerala: any;
  public KeralaT: any;

  public Telangana: any;
  public TelanganaT: any; 

  public  Mizoram: any;
  public  MizoramT: any;

  public Tripura: any;
  public TripuraT: any;

  public Manipur: any;
  public ManipurT: any;

  public ArunachalPradesh: any;
  public ArunachalPradeshT: any;

  public Jharkhand: any;
  public JharkhandT: any;

  public Goa: any;
  public GoaT: any;

  public Delhi: any;
  public DelhiT: any;

  public JammuandKashmir: any;
  public JammuandKashmirT: any;

  public Odisha: any;
  public OdishaT: any;

  public Sikkim: any;
  public SikkimT: any;

  public Uttarakhand: any;
  public UttarakhandT: any;  

  ///////////////////////////////////////

  public params = new HttpParams(); 

  public statewisescore: any = []; 

  public citem: any;

  public year: any;
  public year1: any;

  constructor(private fb: FormBuilder, private ds: DataService)  { 
    
    this.indiasvg = this.fb.group({ //definition to cons           
    });
  }

  /////////////////////////////////////////////////

  ngOnInit(): void {    

    this.getnitiaayogdatayearwise('2020'); //at load 

    this.ds.selectedYear$.subscribe((data: any) => {
      this.year = data      
      this.params = this.params.set("year", this.year);
      this.getnitiaayogdatayearwise(this.year)
    });   
  }

  /////////////////////////////////////////////

  getnitiaayogdatayearwise(year1: any) {
    
    this.ds.paramFunction('data/getindianitiaayogdatayearwise', year1).subscribe((res: any) => {
      this.statewisescore = res;

      for (var index in res) 
      {
        if (res[index].state_name == "MadhyaPradesh")
        {
          if (res[index].state_norm_score <=49) {
            this.MadhyaPradesh = '#dd1e47';
            this.MadhyaPradeshT = "Madhya Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.MadhyaPradesh = '#ffc40c';
            this.MadhyaPradeshT = "Madhya Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.MadhyaPradesh = '#00a084';
            this.MadhyaPradeshT = "Madhya Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.MadhyaPradesh = '#00aeef';
            this.MadhyaPradeshT = "Madhya Pradesh with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "UttarPradesh") {
          if (res[index].state_norm_score <=49) {
            this.UttarPradesh = '#dd1e47';
            this.UttarPradeshT = "Uttar Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.UttarPradesh = '#ffc40c';
            this.UttarPradeshT = "Uttar Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.UttarPradesh = '#00a084';
            this.UttarPradeshT = "Uttar Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.UttarPradesh = '#00aeef';
            this.UttarPradeshT = "Uttar Pradesh with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Karnataka") {
          if (res[index].state_norm_score <=49) {
            this.Karnataka = '#dd1e47';
            this.KarnatakaT = "Karnataka with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Karnataka = '#ffc40c';
            this.KarnatakaT = "Karnataka with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Karnataka = '#00a084';
            this.KarnatakaT = "Karnataka with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Karnataka = '#00aeef';
            this.KarnatakaT = "Karnataka with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Nagaland") {
          if (res[index].state_norm_score <=49) {
            this.Nagaland = '#dd1e47';
            this.NagalandT = "Nagaland with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Nagaland = '#ffc40c';
            this.NagalandT = "Nagaland with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Nagaland = '#00a084';
            this.NagalandT = "Nagaland with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Nagaland = '#00aeef';
            this.NagalandT = "Nagaland with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Bihar") {
          if (res[index].state_norm_score <=49) {
            this.Bihar = '#dd1e47';
            this.BiharT = "Bihar with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Bihar = '#ffc40c';
            this.BiharT = "Bihar with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Bihar = '#00a084';
            this.BiharT = "Bihar with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Bihar = '#00aeef';
            this.BiharT = "Bihar with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "AndamanandNicobar") {
          if (res[index].state_norm_score <=49) {
            this.AndamanandNicobar = '#dd1e47';
            this.AndamanandNicobarT = "Andaman and Nicobar with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.AndamanandNicobar = '#ffc40c';
            this.AndamanandNicobarT = "Andaman and Nicobar with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.AndamanandNicobar = '#00a084';
            this.AndamanandNicobarT = "Andaman and Nicobar with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.AndamanandNicobar = '#00aeef';
            this.AndamanandNicobarT = "Andaman and Nicobar with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Lakshadweep") {
          if (res[index].state_norm_score <=49) {
            this.Lakshadweep = '#dd1e47';
            this.LakshadweepT = "Lakshadweep with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Lakshadweep = '#ffc40c';
            this.LakshadweepT = "Lakshadweep with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Lakshadweep = '#00a084';
            this.LakshadweepT = "Lakshadweep with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Lakshadweep = '#00aeef';
            this.LakshadweepT = "Lakshadweep with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Assam") {
          if (res[index].state_norm_score <=49) {
            this.Assam = '#dd1e47';
            this.AssamT = "Assam with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Assam = '#ffc40c';
            this.AssamT = "Assam with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Assam = '#00a084';
            this.AssamT = "Assam with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Assam = '#00aeef';
            this.AssamT = "Assam with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "WestBengal") {
          if (res[index].state_norm_score <=49) {
            this.WestBengal = '#dd1e47';
            this.WestBengalT = "West Bengal with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.WestBengal = '#ffc40c';
            this.WestBengalT = "West Bengal with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.WestBengal = '#00a084';
            this.WestBengalT = "West Bengal with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.WestBengal = '#00aeef';
            this.WestBengalT = "West Bengal with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Puducherry") {
          if (res[index].state_norm_score <=49) {
            this.Puducherry = '#dd1e47';
            this.PuducherryT = "Puducherry with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Puducherry = '#ffc40c';
            this.PuducherryT = "Puducherry with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Puducherry = '#00a084';
            this.PuducherryT = "Puducherry with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Puducherry = '#00aeef';
            this.PuducherryT = "Puducherry with Goal Score :" + res[index].state_norm_score;
          }
        }        

        if (res[index].state_name == "DamanandDiu") {
          if (res[index].state_norm_score <=49) {
            this.DamanandDiu = '#dd1e47';
            this.DamanandDiuT = "Daman and Diu with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.DamanandDiu = '#ffc40c';
            this.DamanandDiuT = "Daman and Diu with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.DamanandDiu = '#00a084';
            this.DamanandDiuT = "Daman and Diu with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.DamanandDiu = '#00aeef';
            this.DamanandDiuT = "Daman and Diu with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Gujarat") {
          if (res[index].state_norm_score <=49) {
            this.Gujarat = '#dd1e47';
            this.GujaratT = "Gujarat with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Gujarat = '#ffc40c';
            this.GujaratT = "Gujarat with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Gujarat = '#00a084';
            this.GujaratT = "Gujarat with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Gujarat = '#00aeef';
            this.GujaratT = "Gujarat with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Rajasthan") {
          if (res[index].state_norm_score <=49) {
            this.Rajasthan = '#dd1e47';
            this.RajasthanT = "Rajasthan with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Rajasthan = '#ffc40c';
            this.RajasthanT = "Rajasthan with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Rajasthan = '#00a084';
            this.RajasthanT = "Rajasthan with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Rajasthan = '#00aeef';
            this.RajasthanT = "Rajasthan with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "DadraandNagarHaveli") {
          if (res[index].state_norm_score <=49) {
            this.DadraandNagarHaveli = '#dd1e47';
            this.DadraandNagarHaveliT = "Dadra and NagarHaveli with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.DadraandNagarHaveli = '#ffc40c';
            this.DadraandNagarHaveliT = "Dadra and NagarHaveli with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.DadraandNagarHaveli = '#00a084';
            this.DadraandNagarHaveliT = "Dadra and NagarHaveli with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.DadraandNagarHaveli = '#00aeef';
            this.DadraandNagarHaveliT = "Dadra and NagarHaveli with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Chhattisgarh") {
          if (res[index].state_norm_score <=49) {
            this.Chhattisgarh = '#dd1e47';
            this.ChhattisgarhT = "Chhattisgarh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Chhattisgarh = '#ffc40c';
            this.ChhattisgarhT = "Chhattisgarh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Chhattisgarh = '#00a084';
            this.ChhattisgarhT = "Chhattisgarh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Chhattisgarh = '#00aeef';
            this.ChhattisgarhT = "Chhattisgarh with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "TamilNadu") {
          if (res[index].state_norm_score <=49) {
            this.TamilNadu = '#dd1e47';
            this.TamilNaduT = "TamilNadu with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.TamilNadu = '#ffc40c';
            this.TamilNaduT = "TamilNadu with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.TamilNadu = '#00a084';
            this.TamilNaduT = "TamilNadu with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.TamilNadu = '#00aeef';
            this.TamilNaduT = "TamilNadu with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Chandigarh") {
          if (res[index].state_norm_score <=49) {
            this.Chandigarh = '#dd1e47';
            this.ChandigarhT = "Chandigarh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Chandigarh = '#ffc40c';
            this.ChandigarhT = "Chandigarh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Chandigarh = '#00a084';
            this.ChandigarhT = "Chandigarh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Chandigarh = '#00aeef';
            this.ChandigarhT = "Chandigarh with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Punjab") {
          if (res[index].state_norm_score <=49) {
            this.Punjab = '#dd1e47';
            this.PunjabT = "Punjab with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Punjab = '#ffc40c';
            this.PunjabT = "Punjab with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Punjab = '#00a084';
            this.PunjabT = "Punjab with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Punjab = '#00aeef';
            this.PunjabT = "Punjab with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Haryana") {
          if (res[index].state_norm_score <=49) {
            this.Haryana = '#dd1e47';
            this.HaryanaT = "Haryana with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Haryana = '#ffc40c';
            this.HaryanaT = "Haryana with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Haryana = '#00a084';
            this.HaryanaT = "Haryana with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Haryana = '#00aeef';
            this.HaryanaT = "Haryana with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "AndhraPradesh") {
          if (res[index].state_norm_score <=49) {
            this.AndhraPradesh = '#dd1e47';
            this.AndhraPradeshT = "Andhra Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.AndhraPradesh = '#ffc40c';
            this.AndhraPradeshT = "Andhra Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.AndhraPradesh = '#00a084';
            this.AndhraPradeshT = "Andhra Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.AndhraPradesh = '#00aeef';
            this.AndhraPradeshT = "Andhra Pradesh with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Maharashtra") {
          if (res[index].state_norm_score <=49) {
            this.Maharashtra = '#dd1e47';
            this.MaharashtraT = "Maharashtra with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Maharashtra = '#ffc40c';
            this.MaharashtraT = "Maharashtra with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Maharashtra = '#00a084';
            this.MaharashtraT = "Maharashtra with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Maharashtra = '#00aeef';
            this.MaharashtraT = "Maharashtra with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "HimachalPradesh") {
          if (res[index].state_norm_score <=49) {
            this.HimachalPradesh = '#dd1e47';
            this.HimachalPradeshT = "Himachal Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.HimachalPradesh = '#ffc40c';
            this.HimachalPradeshT = "Himachal Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.HimachalPradesh = '#00a084';
            this.HimachalPradeshT = "Himachal Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.HimachalPradesh = '#00aeef';
            this.HimachalPradeshT = "Himachal Pradesh with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Meghalaya") {
          if (res[index].state_norm_score <=49) {
            this.Meghalaya = '#dd1e47';
            this.MeghalayaT = "Meghalaya with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Meghalaya = '#ffc40c';
            this.MeghalayaT = "Meghalaya with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Meghalaya = '#00a084';
            this.MeghalayaT = "Meghalaya with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Meghalaya = '#00aeef';
            this.MeghalayaT = "Meghalaya with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Kerala") {
          if (res[index].state_norm_score <=49) {
            this.Kerala = '#dd1e47';
            this.KeralaT = "Kerala with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Kerala = '#ffc40c';
            this.KeralaT = "Kerala with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Kerala = '#00a084';
            this.KeralaT = "Kerala with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Kerala = '#00aeef';
            this.KeralaT = "Kerala with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Telangana") {
          if (res[index].state_norm_score <=49) {
            this.Telangana = '#dd1e47';
            this.TelanganaT = "Telangana with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Telangana = '#ffc40c';
            this.TelanganaT = "Telangana with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Telangana = '#00a084';
            this.TelanganaT = "Telangana with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Telangana = '#00aeef';
            this.TelanganaT = "Telangana with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Mizoram") {
          if (res[index].state_norm_score <=49) {
            this.Mizoram = '#dd1e47';
            this.MizoramT = "Mizoram with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Mizoram = '#ffc40c';
            this.MizoramT = "Mizoram with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Mizoram = '#00a084';
            this.MizoramT = "Mizoram with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Mizoram = '#00aeef';
            this.MizoramT = "Mizoram with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Tripura") {
          if (res[index].state_norm_score <=49) {
            this.Tripura = '#dd1e47';
            this.TripuraT = "Tripura with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Tripura = '#ffc40c';
            this.TripuraT = "Tripura with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Tripura = '#00a084';
            this.TripuraT = "Tripura with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Tripura = '#00aeef';
            this.TripuraT = "Tripura with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Manipur") {
          if (res[index].state_norm_score <=49) {
            this.Manipur = '#dd1e47';
            this.ManipurT = "Manipur with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Manipur = '#ffc40c';
            this.ManipurT = "Manipur with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Manipur = '#00a084';
            this.ManipurT = "Manipur with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Manipur = '#00aeef';
            this.ManipurT = "Manipur with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "ArunachalPradesh") {
          if (res[index].state_norm_score <=49) {
            this.ArunachalPradesh = '#dd1e47';
            this.ArunachalPradeshT = "Arunachal Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.ArunachalPradesh = '#ffc40c';
            this.ArunachalPradeshT = "Arunachal Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.ArunachalPradesh = '#00a084';
            this.ArunachalPradeshT = "Arunachal Pradesh with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.ArunachalPradesh = '#00aeef';
            this.ArunachalPradeshT = "Arunachal Pradesh with Goal Score :" + res[index].state_norm_score;
          }
        } 

        if (res[index].state_name == "Jharkhand") {
          if (res[index].state_norm_score <=49) {
            this.Jharkhand = '#dd1e47';
            this.JharkhandT = "Jharkhand with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Jharkhand = '#ffc40c';
            this.JharkhandT = "Jharkhand with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Jharkhand = '#00a084';
            this.JharkhandT = "Jharkhand with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Jharkhand = '#00aeef';
            this.JharkhandT = "Jharkhand with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Goa") {
          if (res[index].state_norm_score <=49) {
            this.Goa = '#dd1e47';
            this.GoaT = "Goa with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Goa = '#ffc40c';
            this.GoaT = "Goa with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Goa = '#00a084';
            this.GoaT = "Goa with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Goa = '#00aeef';
            this.GoaT = "Goa with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Delhi") {
          if (res[index].state_norm_score <=49) {
            this.Delhi = '#dd1e47';
            this.DelhiT = "Delhi with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Delhi = '#ffc40c';
            this.DelhiT = "Delhi with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Delhi = '#00a084';
            this.DelhiT = "Delhi with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Delhi = '#00aeef';
            this.DelhiT = "Delhi with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Odisha") {
          if (res[index].state_norm_score <=49) {
            this.Odisha = '#dd1e47';
            this.OdishaT = "Odisha with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Odisha = '#ffc40c';
            this.OdishaT = "Odisha with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Odisha = '#00a084';
            this.OdishaT = "Odisha with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Odisha = '#00aeef';
            this.OdishaT = "Odisha with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "JammuandKashmir") {
          if (res[index].state_norm_score <=49) {
            this.JammuandKashmir = '#dd1e47';
            this.JammuandKashmirT = "Jammu and Kashmir with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.JammuandKashmir = '#ffc40c';
            this.JammuandKashmirT = "Jammu and Kashmir with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.JammuandKashmir = '#00a084';
            this.JammuandKashmirT = "Jammu and Kashmir with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.JammuandKashmir = '#00aeef';
            this.JammuandKashmirT = "Jammu and Kashmir with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Sikkim") {
          if (res[index].state_norm_score <=49) {
            this.Sikkim = '#dd1e47';
            this.SikkimT = "Sikkim with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Sikkim = '#ffc40c';
            this.SikkimT = "Sikkim with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Sikkim = '#00a084';
            this.SikkimT = "Sikkim with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Sikkim = '#00aeef';
            this.SikkimT = "Sikkim with Goal Score :" + res[index].state_norm_score;
          }
        }

        if (res[index].state_name == "Uttarakhand") {
          if (res[index].state_norm_score <=49) {
            this.Uttarakhand = '#dd1e47';
            this.UttarakhandT = "Uttarakhand with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >=50 && res[index].state_norm_score <= 64) {
            this.Uttarakhand = '#ffc40c';
            this.UttarakhandT = "Uttarakhand with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 65 && res[index].state_norm_score <= 99) {
            this.Uttarakhand = '#00a084';
            this.UttarakhandT = "Uttarakhand with Goal Score :" + res[index].state_norm_score;
          }
          else if (res[index].state_norm_score >= 100) {
            this.Uttarakhand = '#00aeef';
            this.UttarakhandT = "Uttarakhand with Goal Score :" + res[index].state_norm_score;
          }
        }  

      } //for-loop     
    });//
  }//functionclose

  
  

}
