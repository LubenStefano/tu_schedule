import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import scheduleData from '../../schedule.json';

interface Lecture {
  time: string;
  subject: string;
  week?: 'нечетна' | 'четна' | 'all';
  type: 'поток' | 'група' | 'подгрупа';
}

interface DaySchedule {
  [key: string]: Lecture[];
}

interface Subgroup {
  a: DaySchedule;
  b: DaySchedule;
}

interface GroupSchedule {
  group: string;
  subgroups: Subgroup;
}

interface AllGroups {
  all_groups: {
    [key: string]: Lecture[];
  };
}

interface WeekLectures {
  [key: string]: Lecture[];
}

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.css'
})
export class UiComponent {
  schedule = (scheduleData as any).schedule as (GroupSchedule | AllGroups)[];
  selectedGroup: string = '';
  daysOfWeek: string[] = ['Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък'];
  today: string = this.getTodayInBulgarian();

  isWeekend(): boolean {
    const day = new Date().getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  }

  getWeekLabel(): string {
    return this.isWeekend() ? 'Следващата седмица' : 'Тази седмица';
  }

  getCurrentWeekType(): string {
    return this.isOddWeek() ? 'нечетна' : 'четна';
  }

  private isOddWeek(): boolean {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    let weekNumber = Math.ceil((day + start.getDay() + 1) / 7);

    return weekNumber % 2 === 1;
  }

  private filterLecturesByWeek(lectures: Lecture[]): Lecture[] {
    return lectures.filter(lecture => {
      if (!lecture.week || lecture.week === 'all') return true; // Show lectures with no week specified or 'all' week
      return this.isOddWeek() ? lecture.week === 'нечетна' : lecture.week === 'четна';
    });
  }

  hasLecturePassed(lectureTime: string): boolean {
    const now = new Date();
    const [startTime] = lectureTime.split(' - ');
    const [hours, minutes] = startTime.split(':').map(Number);
    const lectureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    return now > lectureDate;
  }

  isLectureHappeningNow(lectureTime: string): boolean {
    const now = new Date();
    const [startTime, endTime] = lectureTime.split(' - ');
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const lectureStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHours, startMinutes);
    const lectureEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHours, endMinutes);
    return now >= lectureStart && now <= lectureEnd;
  }

  getTodayLectures(): Lecture[] {
    if (!this.selectedGroup) return [];
    const [groupNum, subgroup] = [this.selectedGroup.slice(0, 2), this.selectedGroup[2]];
    const groupData = this.schedule.find(g => 'group' in g && g.group === groupNum) as GroupSchedule;
    const allGroupsData = this.schedule.find(g => 'all_groups' in g) as AllGroups;
    
    const groupLectures = groupData?.subgroups?.[subgroup as keyof Subgroup]?.[this.today] || [];
    const allGroupsLectures = allGroupsData?.all_groups?.[this.today] || [];
    
    return this.filterLecturesByWeek([...groupLectures, ...allGroupsLectures]);
  }

  getWeekLectures(): WeekLectures {
    if (!this.selectedGroup) return {};
    const [groupNum, subgroup] = [this.selectedGroup.slice(0, 2), this.selectedGroup[2]];
    const groupData = this.schedule.find(g => 'group' in g && g.group === groupNum) as GroupSchedule;
    const allGroupsData = this.schedule.find(g => 'all_groups' in g) as AllGroups;
    
    const weekLectures: WeekLectures = {};
    this.daysOfWeek.forEach(day => {
      const groupLectures = groupData?.subgroups?.[subgroup as keyof Subgroup]?.[day] || [];
      const allGroupsLectures = allGroupsData?.all_groups?.[day] || [];
      weekLectures[day] = this.filterLecturesByWeek([...groupLectures, ...allGroupsLectures]);
    });
    
    return weekLectures;
  }

  getFilteredDaysOfWeek(): string[] {
    return this.daysOfWeek.filter(day => day !== this.today && !this.isDayPassed(day));
  }

  private isDayPassed(day: string): boolean {
    const todayIndex = new Date().getDay();
    const dayIndex = this.daysOfWeek.indexOf(day);
    return dayIndex < todayIndex;
  }

  private getTodayInBulgarian(): string {
    const daysInBulgarian = ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'];
    const todayIndex = new Date().getDay();
    return daysInBulgarian[todayIndex];
  }
}
