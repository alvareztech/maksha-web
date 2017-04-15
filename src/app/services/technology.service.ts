import {Injectable} from '@angular/core';
import {Technology} from '../interfaces/technology';

@Injectable()
export class TechnologyService {

  technologies: Technology[] = [
    {
      id: 'ios',
      name: 'iOS',
      color: '#1C56FB',
      icon: 'ios.svg'
    },
    {
      id: 'android',
      name: 'Android',
      color: '#3ECF8E',
      icon: 'android.svg'
    },
    {
      id: 'java',
      name: 'Java',
      color: '#FF0844',
      icon: 'java.svg'
    },
    {
      id: 'firebase',
      name: 'Firebase',
      color: '#FCCA3F',
      icon: 'firebase.svg'
    },
    {
      id: 'angular',
      name: 'Angular',
      color: '#FF0844',
      icon: 'angular.svg'
    }
  ];

  constructor() {
  }

  getTechnology(id: string): Technology {
    return this.technologies.find(x => x.id === id);
  }

}
