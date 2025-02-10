import { AfterViewInit, Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { BoxComponentsType } from '@app/enums/box-component-enum';
import { HeadService } from '@app/services/head.service';
import { LowerCasePipe } from '@angular/common';
const _ = require('lodash');

declare let Box: any;

@Component({
    selector: 'content-preview',
    templateUrl: './content-preview.component.html',
    styleUrls: ['./content-preview.component.scss'],
    imports: [LowerCasePipe]
})

export class ContentPreviewComponent implements OnChanges, OnInit, AfterViewInit {

  boxCdnJS = "https://cdn01.boxcdn.net/platform/elements/22.0.0/en-US/preview.js";
  boxCdnCss = "https://cdn01.boxcdn.net/platform/elements/22.0.0/en-US/preview.css";
  boxComponent = BoxComponentsType.ContentPreview;

  @Input() accessToken: string | undefined = '';
  @Input() entityId: string | undefined = undefined;
  @Input() componentId: string | undefined = 'box-abstact-component';
  @Input() options: any = {};
  @Input() showPreview: boolean = true;
  boxToken: string | undefined;
  private opts!: any;
  private boxComponentInstance!: any;

  constructor(private renderer: Renderer2,private headService: HeadService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.debug("ngOnChanges...");
    this.reloadCompent();
  }

  ngOnInit(): void {
    console.debug("ngOnInit...");
    this.reloadCompent()
  }

  ngAfterViewInit() {
    console.debug("ngAfterViewInit...");
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
    console.debug(`loadJs with ${src}`);
    if (src === '') return
    if (this.headService.isScriptLoaded(src)) {
      console.debug(`src ${src} is loaded.  Initializing...`);
      this.initializeComponent()
      return
    }
    const scriptElement = this.headService.loadJsScript(this.renderer, src);

    scriptElement.onload = () => {
      console.debug("onLoaded init component...");
      try {
        this.initializeComponent()
      }
      catch (error: any) {
        console.error(error);
      }
    }

    scriptElement.onerror = () => {
      console.warn(`Could not load ${this.boxComponent} Script!`);
    }
  }

  private initializeComponent(): void { 
    console.debug(`initializeComponent() with ${this.accessToken} and ${this.entityId}`)
    this.boxComponentInstance = new Box[this.boxComponent]();
    this.opts = _.merge({},{container: `#${this.boxComponent.toLowerCase()}`},this.options);
    if ((this.accessToken !== undefined) && (this.entityId !== undefined) && this.showPreview) {
      this.boxComponentInstance.show(this.entityId, this.accessToken, this.opts);
    }
  }

  private reloadCompent(): void {
    console.debug(`reloadComponent() with ${this.accessToken} and ${this.entityId}`)
    if (this.boxComponentInstance) {
      console.debug("HIding Component and chaecking if it can show...")
      this.boxComponentInstance.hide();
      if ((this.accessToken !== undefined) && (this.entityId !== undefined) && this.showPreview) {
        this.boxComponentInstance.show(this.entityId, this.accessToken, this.opts);
      }
    }
  }

}

