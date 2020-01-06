import { Component, OnInit } from "@angular/core";
import { Slider } from "tns-core-modules/ui/slider";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Color } from "tns-core-modules/color/color";

export class MMColour {
    public r: number = 10;
    public g: number = 10;
    public b: number = 10;
    public d: number = 1;

    constructor() {}

    public createQueryString(): string {
        return `?r=${this.r.toFixed(0)}&g=${this.g.toFixed(0)}&b=${this.b.toFixed(0)}&d=${this.d.toFixed(0)}`;
    }

    public toHex(): string {
        try {
        const colour: Color = new Color(0, this.r, this.g, this.b);
        return `#${colour.hex.substring(3)}`;
        } catch(ex) {
            return '#FFFFFF';
        }
    }
}

@Component({
    selector: "mm-colour",
    templateUrl: "./colour.component.html"
})
export class ColourComponent implements OnInit {

    public ourColour: MMColour = new MMColour();
    public test: string = 'red';
    public url: string = 'http://192.168.1.4';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {

    }

    public updateColour() {
        this.makeUpdateColourRequest().subscribe((r) => {
            console.log(r);
        });
    }

    private makeUpdateColourRequest(): Observable<any> {
        const requestUrl = `${this.url}/${this.ourColour.createQueryString()}`;
        console.log(`Making request to: ${requestUrl}`);
        return this.http.get(requestUrl);
    }

    onRSliderValueChange(args) {
        let slider = <Slider>args.object;
        this.ourColour.r = slider.value;
    }

    onGSliderValueChange(args) {
        let slider = <Slider>args.object;
        this.ourColour.g = slider.value;
    }

    onBSliderValueChange(args) {
        let slider = <Slider>args.object;
        this.ourColour.b = slider.value;
    }
}
