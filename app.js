const App = {
  init() {
    // Elements
    this.buttonsContainer = document.querySelector('.buttons');
    this.textBox = document.querySelector('.text_box');

    // State
    this.buttons = [
      {
        command: 'bold',
        class: 'fa-bold',
        pushed: false,
      },
      {
        command: 'createLink',
        class: 'fa-link',
        pushed: false,
      },
      {
        command: 'insertOrderList',
        class: 'fa-list-ol',
        pushed: false,
      },
      {
        command: 'insertUnorderedList',
        class: 'fa-list-ul',
        pushed: false,
      },
      {
        command: 'italic',
        class: 'fa-italic',
        pushed: false,
      },
      {
        command: 'justifyLeft',
        class: 'fa-align-left',
        pushed: false,
      },
      {
        command: 'justifyRight',
        class: 'fa-align-right',
        pushed: false,
      },
      {
        command: 'justifyCenter',
        class: 'fa-align-center',
        pushed: false,
      },
      {
        command: 'justifyFull',
        class: 'fa-align-justify',
        pushed: false,
      },
      {
        command: 'strikeThrough',
        class: 'fa-strikethrough',
        pushed: false,
      },
      {
        command: 'underline',
        class: 'fa-underline',
        pushed: false,
      },
    ];

    this.newState = false;

    // Event handling
    this.bindButtonClick();
    this.bindSelectionChange();

    // Rendering
    this.setupTemplates();
    this.renderButtons();
  },

  setupTemplates() {
    const template = document.querySelector('#buttons_template').innerHTML;
    this.buttonsTemplate = Handlebars.compile(template);
  },

  renderButtons() {
    this.clearButtonsContainer();

    this.buttonsContainer.insertAdjacentHTML(
      'afterbegin',
      this.buttonsTemplate({ buttons: this.buttons })
    );
  },

  clearButtonsContainer() {
    this.buttonsContainer.querySelectorAll('button').forEach((button) => {
      button.remove();
    });
  },

  // Event handlers
  bindButtonClick() {
    this.buttonsContainer.addEventListener('click', (e) => {
      const target = e.target;

      if (target instanceof HTMLButtonElement) {
        const command = target.dataset.command;
        document.execCommand(command);
        this.updateButtonStates();
        this.renderButtons();
        this.newState = true; // Don't rerender buttons yet
        this.textBox.focus();
      }
    });
  },

  bindSelectionChange() {
    document.addEventListener('selectionchange', () => {
      if (this.newState) {
        this.newState = false;
        return;
      }

      this.updateButtonStates();
      this.renderButtons();
    });
  },

  updateButtonStates() {
    this.buttons.forEach((button) => {
      button.pushed = document.queryCommandState(button.command);
    });
  },
};

App.init();
