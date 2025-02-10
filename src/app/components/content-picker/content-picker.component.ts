import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { HeadService } from '@app/services/head.service';
const _ = require('lodash');

declare let Box: any;

@Component({
    selector: 'content-picker',
    templateUrl: './content-picker.component.html',
    styleUrls: ['./content-picker.component.scss'],
    imports: []
})

export class ContentPickerComponent implements OnInit, OnChanges, AfterViewInit {

  boxCdnJS = "https://cdn01.boxcdn.net/platform/elements/22.0.0/en-US/picker.js";
  boxCdnCss = "https://cdn01.boxcdn.net/platform/elements/22.0.0/en-US/picker.css";

  @Input() accessToken: string | undefined = undefined
  @Input() entityId: string | undefined = '0';
  @Input() componentId: string | undefined = 'box-abstact-component';
  @Input() options: any = {};
  @Input() boxComponent: BoxComponentsType = BoxComponentsType.ContentPicker
  @Output('selectedItems') selectedItems: EventEmitter<string> = new EventEmitter<string>();

  boxToken: string | undefined;
  private opts!: any;
  private boxComponentInstance!: any;

  constructor(private renderer: Renderer2,
    private headService: HeadService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.reloadCompent();
  }

  ngOnInit(): void {
    this.reloadCompent()
  }

  ngAfterViewInit() {
    this.loadJs(this.boxCdnJS)
    this.loadCss(this.boxCdnCss)
  }

  private loadCss(href: string):void {
    if (href === '' || this.headService.isStylesheetLoaded(href)) return
    const styleElement = this.headService.loadStylesheetLink(this.renderer, href);

    styleElement.onerror = () => {
      console.warn(`Could not load ${this.boxComponent} Stylesheet!`);
    }
  }

  private loadJs(src: string):void {
    console.debug("loadHs...");
    if (src === '') return
    if (this.headService.isScriptLoaded(src)) {
      this.initializeComponent()
      return
    }
    const scriptElement = this.headService.loadJsScript(this.renderer, src);

    scriptElement.onload = () => {
      this.initializeComponent()
    }

    scriptElement.onerror = () => {
      console.warn(`Could not load ${this.boxComponent} Script!`);
    }
  }

  private initializeComponent(): void { 
    console.debug(`initialzeComponent() with ${this.accessToken}`);
    this.boxComponentInstance = new Box[this.boxComponent]();
    this.boxComponentInstance.addListener("choose", (items: any) => {
      this.selectedItems.emit(items);
    });
    this.boxComponentInstance.addListener("cancel", () => {
      this.selectedItems.emit(undefined);
    })
    this.opts = _.merge({},{container: `#${this.componentId}`},this.options);
    if (this.accessToken !== undefined) {
      console.log("Showing Component...");
      this.boxComponentInstance.show(this.entityId, this.accessToken, this.opts);
    }
  }

  private reloadCompent(): void {
    console.debug(`reloadComponent() with ${this.accessToken}`);
    if (this.boxComponentInstance) {
      console.debug("Has instance...");
      this.boxComponentInstance.hide();
      if (this.accessToken !== undefined) {
        console.log("Showing...");
        this.boxComponentInstance.show(this.entityId, this.accessToken, this.opts);
      }
    }
  }
}

