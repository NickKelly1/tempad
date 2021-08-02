import './todo.scss';
import $ from 'jquery';
import { Page } from "../../types";
import * as _html from './todo.html';
import { animate, AnimationDefinition, AnimationType } from '../../utils/animate';
import { pageController } from '../page-controller';
import { mainMenuPage } from '../mainmenu/mainmenu.page';

export interface TodoPageOpenProps {
  animation?: AnimationDefinition;
}

async function open(props: TodoPageOpenProps) {
  const { animation } = props;
  $('#page-container').append(_html.page());
  if (animation) await animate('.todopage', animation);
  $('.todopage .btn-back').on('click', async function () {
    $(this).addClass('active');
    $(this).prop('disabled', true);
    await pageController.close(todoPage, {
      animation: {
        duration: 500,
        type: AnimationType.SwitchOff,
      },
    });
    await pageController.open(mainMenuPage, {
      animation: {
        duration: 500,
        type: AnimationType.SwitchOn,
      },
    });
  });
}

export interface TodoPageCloseProps {
  animation?: AnimationDefinition;
}

async function close(props: TodoPageOpenProps) {
  const { animation } = props;
  if (animation) await animate('.todopage', animation);
  $('.todopage').remove();
}

export const todoPage: Page<TodoPageOpenProps, TodoPageCloseProps> = {
  id: 'todo',
  open,
  close,
}