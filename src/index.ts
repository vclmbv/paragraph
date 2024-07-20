import $ from "@vclmbv/dtls";

import { Config, Data, Constructor, CSS, UI } from "./types";

class Paragraph {
  /* required */
  static get icon() {
    return { icon: "text", title: "text" };
  }

  /* optional */
  static get readOnly(): boolean {
    return true;
  }
  static get paste() {
    return { tags: ["p"] };
  }
  static get sanitize() {
    return {
      text: { br: true },
    };
  }
  static get convert() {
    return {
      export: "text",
      import: "text",
    };
  }

  /* custom */
  api;
  readOnly: boolean;
  private config: Config;
  private data: Data;
  private CSS: CSS;
  private ui: UI;

  /* contructor */
  constructor({ api, config, data, readOnly }: Constructor) {
    this.api = api;
    this.readOnly = readOnly;
    this.config = {
      placeholder: config.placeholder ? config.placeholder : "",
      blank: config.blank,
    };
    this.data = { text: data.text };

    this.CSS = {
      block: this.api.styles.block,
      container: "we-paragraph",
    };
    this.ui = this.createUI();
  }

  createUI(): UI {
    const container = $.make("div", [this.CSS.block, this.CSS.container], {
      contentEditable: this.readOnly ? "false" : "true",
      innerHTML: this.data.text || "",
    });

    container.dataset.placeholder = this.api.i18n.t(
      this.config.placeholder || ""
    );

    if (!this.readOnly) {
      container.addEventListener("keyup", (e: KeyboardEvent) => {
        switch (e.code) {
          case "Backspace":
          case "Delete":
            if (container.textContent === "") {
              container.innerHTML = "";
            }

            break;
        }
      });
    }

    return container as UI;
  }

  /* required */
  public render(): UI {
    return this.ui;
  }
  public save(blockContent: UI): Data {
    return { text: blockContent.innerHTML };
  }

  /* optional 
  public validate(savedData) {}
  public onPaste(event) {}
  public merge(data) {}
  */

  /* custom */
}
export default Paragraph;
