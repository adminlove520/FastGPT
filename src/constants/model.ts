import type { ServiceName } from '@/types/mongoSchema';
import { ModelSchema } from '../types/mongoSchema';

export enum ChatModelNameEnum {
  GPT35 = 'gpt-3.5-turbo',
  GPT3 = 'text-davinci-003'
}

export type ModelConstantsData = {
  serviceCompany: `${ServiceName}`;
  name: string;
  model: `${ChatModelNameEnum}`;
  trainName: string; // 空字符串代表不能训练
  maxToken: number;
  maxTemperature: number;
  price: number; // 多少钱 / 1字，单位: 0.00001元
};

export const ModelList: ModelConstantsData[] = [
  {
    serviceCompany: 'openai',
    name: 'chatGPT',
    model: ChatModelNameEnum.GPT35,
    trainName: 'turbo',
    maxToken: 4000,
    maxTemperature: 2,
    price: 2
  },
  {
    serviceCompany: 'openai',
    name: 'GPT3',
    model: ChatModelNameEnum.GPT3,
    trainName: 'davinci',
    maxToken: 4000,
    maxTemperature: 2,
    price: 20
  }
];

export enum TrainingStatusEnum {
  pending = 'pending',
  succeed = 'succeed',
  errored = 'errored',
  canceled = 'canceled'
}

export enum ModelStatusEnum {
  running = 'running',
  training = 'training',
  pending = 'pending',
  closed = 'closed'
}

export const formatModelStatus = {
  [ModelStatusEnum.running]: {
    colorTheme: 'green',
    text: '运行中'
  },
  [ModelStatusEnum.training]: {
    colorTheme: 'blue',
    text: '训练中'
  },
  [ModelStatusEnum.pending]: {
    colorTheme: 'gray',
    text: '加载中'
  },
  [ModelStatusEnum.closed]: {
    colorTheme: 'red',
    text: '已关闭'
  }
};

export const defaultModel: ModelSchema = {
  _id: '',
  userId: '',
  name: '',
  avatar: '',
  status: ModelStatusEnum.pending,
  updateTime: Date.now(),
  trainingTimes: 0,
  systemPrompt: '',
  intro: '',
  temperature: 5,
  service: {
    company: 'openai',
    trainId: '',
    chatModel: ChatModelNameEnum.GPT35,
    modelName: ChatModelNameEnum.GPT35
  },
  security: {
    domain: ['*'],
    contextMaxLen: 1,
    contentMaxLen: 1,
    expiredTime: 9999,
    maxLoadAmount: 1
  }
};
