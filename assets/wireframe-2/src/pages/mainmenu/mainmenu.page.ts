import $ from 'jquery';
import { Page } from "../../types";
import { animate, AnimationDefinition, AnimationType } from '../../utils/animate';
import { fade } from "../../utils/css/fade.css";
import { setAbortableTimeout } from "../../utils/set-abortable-timeout";
import { wait } from "../../utils/wait";
import { pageController } from "../page-controller";
import { timedoorPage } from "../timedoor/timedoor.page";
import { todoPage } from '../todo/todo.page';
import * as _html from './mainmenu.html';

interface MainMenuPageOpenProps {
  animation?: AnimationDefinition;
}

async function open(props: MainMenuPageOpenProps) {
  const { animation } = props;

  $('#page-container').append(_html.page());

  if (animation) await animate('#mainmenu', animation);

  // icons loaded
  let prev: null | AbortController;
  $('#icons')
    .children()
    .on('click', function onIconClick() {
      const program = this.dataset.program;
      if (!program) return console.warn('unknown program');
      // not already active
      if (this.classList.contains('active')) return;
      // remove other actives
      $('#icons').children().not(this).removeClass('active');
      // now active
      $(this).addClass('active');
      console.log(`selected ${program}`);
      // de-activate and re-activate commands
      if (prev) prev?.abort();
      const aborter = new AbortController();
      prev = aborter;
      let i = 0;
      const wait = 100;
      $('#action__list')
        .children()
        .prop('disabled', true)
        .removeClass('active')
        .off('click') // remove old click handlesr before adding new
        .each(function () {
          setAbortableTimeout(
            () => { $(this).prop('disabled', false); },
            (i += 1) * wait,
            aborter.signal,
          );
          $(this).on('click', function onCommandClick() {
            const command = this.dataset.command;
            if (!command) return console.warn(`unknown program (${program}) command`);
            // not already active
            if (this.classList.contains('active')) return
            // remove other actives
            $('#action__list').children().not(this).removeClass('active');
            console.log(`selected ${program}:${command}`);
            // set active
            this.classList.add('active');
            handleRunProgramCommand(program, command);
          });
        })
    });
}

const handlers: Record<string, undefined | Record<string, undefined | (() => void)>> = {
  timedoor: {
    async options() {
      console.log('running timedoor:options');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
    async runprogram() {
      console.log('running timedoor program...');
      const startingRect = $('.icon__btn.timedoor').get(0).getBoundingClientRect();
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.Fade, duration: 500, }, }),
      await pageController.open(timedoorPage, { startingRect, });
    },
    async clearcache() {
      console.log('running timedoor:clearcache');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
  },
  missminutes: {
    async options() {
      console.log('running missminutes:options');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
    async runprogram() {
      console.log('running missminutes program...');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
    async clearcache() {
      console.log('running missminutes:clearcache');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
  },
  settings: {
    async options() {
      console.log('running settings:options');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
    async runprogram() {
      console.log('running settings program...');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
    async clearcache() {
      console.log('running settings:clearcache');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
  },
  directory: {
    async options() {
      console.log('running directory:options');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
    async runprogram() {
      console.log('running directory program...');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
    async clearcache() {
      console.log('running directory:clearcache');
      await pageController.close(mainMenuPage, { animation: { type: AnimationType.SwitchOff, duration: 500, }, }),
      await pageController.open(todoPage, { animation: { type: AnimationType.SwitchOn, duration: 500, }, });
    },
  },
};

function handleRunProgramCommand(program: string, command: string) {
  const programHandler = handlers[program];
  if (!programHandler) return void console.warn(`unhandled program ${program}`);
  const commandHandler = programHandler[command];
  if (!commandHandler) return void console.warn(`unhandled command ${program}:${command}`);
  commandHandler();
}


interface MainMenuPageCloseProps {
  animation?: AnimationDefinition;
}

async function close(props: MainMenuPageCloseProps) {
  const { animation } = props;

  if (animation) {
    await animate('#mainmenu', animation);
  }

  $('#mainmenu').remove();
}

export const mainMenuPage: Page<MainMenuPageOpenProps, MainMenuPageCloseProps> = {
  id: "mainmenu",
  open,
  close,
}
