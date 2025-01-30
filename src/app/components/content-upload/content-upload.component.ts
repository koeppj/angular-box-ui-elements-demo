import { Component, Input, Renderer2, SimpleChanges } from '@angular/core';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { HeadService } from '@app/services/head.service';
import { LowerCasePipe } from '@angular/common';
const _ = require('lodash');

declare let Box: any;

@Component({
    selector: 'content-upload',
    templateUrl: './content-upload.component.html',
    styleUrls: ['./content-upload.component.scss'],
    imports: [LowerCasePipe]
})

export class ContentUploadComponent  {

  boxCdnJS = "https://cdn01.boxcdn.net/platform/elements/21.0.0/en-US/preview.js";
  boxCdnCss = "https://cdn01.boxcdn.net/platform/elements/21.0.0/en-US/preview.css";
  boxComponent = BoxComponentsType.ContentUploader;

  @Input() accessToken: string | undefined = '';
  @Input() entityId: string | undefined = '0';
  @Input() componentId: string | undefined = 'box-abstact-component';
  @Input() options: any = {};
  boxToken: string | undefined;
  private opts!: any;
  private boxComponentInstance!: any;

  constructor(private renderer: Renderer2,private headService: HeadService) {}

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
    this.boxComponentInstance = new Box[this.boxComponent]();

    this.opts = _.merge({},{container: `#${this.boxComponent.toLowerCase()}`},this.options);
    if (this.accessToken !== undefined) {
      this.boxComponentInstance.show(this.entityId, this.accessToken, this.opts);
    }
  }

  private reloadCompent(): void {
    if (this.boxComponentInstance) {
      this.boxComponentInstance.hide();
      this.boxComponentInstance.show(this.entityId, this.accessToken, this.opts);
    }
  }

}

