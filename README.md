# 📅 TU-Schedule – Weekly Schedule Viewer for Technical University of Sofia

🚀 **Live App:** [https://tu-schedule.vercel.app/](https://tu-schedule.vercel.app/)

This project was created for me and my colleagues at **Technical University of Sofia**, because the original weekly schedule provided by the university was difficult to read and navigate at the beginning of the semester. I built this lightweight Angular app very quickly so we could easily check our lecture times and plan our week more efficiently.

---

## 📷 Preview

![image](https://github.com/user-attachments/assets/1b24db37-3122-4aeb-9992-d7018170eea4)

![image](https://github.com/user-attachments/assets/05302b75-2b8b-4f8b-ab81-669f0f55af4b)

---

## ✨ Features

- 👨‍🎓 **Group & Subgroup Selection** – Choose your exact group like `76a`, `77b`, etc.
- 📅 **Current Day Schedule** – Automatically shows today's lectures.
- 🔄 **Even/Odd Week Detection** – Automatically adjusts schedule based on the current week.
- ⏱️ **Live Highlighting** – Highlights lectures happening right now.
- 🕘 **Past Lectures Dimmed** – Helps you focus on what’s ahead.
- 📆 **Full Week View** – Shown on weekends to plan the next week.
- 🌐 **Responsive Design** – Optimized for mobile and desktop.
- 🗣️ **Shared Lectures** – Includes global foreign language sessions for all groups.

---

## 🧠 Data Format (`schedule.json`)

```ts
interface Lecture {
  time: string; // e.g., "11:30 - 13:15"
  subject: string;
  week?: 'even' | 'odd' | 'all';
  type: 'поток' | 'група' | 'подгрупа';
}

interface DaySchedule {
  [day: string]: Lecture[];
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
    [day: string]: Lecture[];
  };
}
````

---

## 🧩 Tech Stack

* 🅰️ **Angular Standalone Components** (No module-based setup)
* 🧠 **TypeScript** – for strict typings and cleaner structure
* 📦 `ngModel`, `NgIf`, `NgFor` – core Angular directives
* 📄 **JSON-based schedule** – easy to update and extend
* 🎨 Custom responsive **CSS styling** for clarity and UX

---

## 📸 UI Preview

<div align="center">
  <img src="https://i.imgur.com/kDEH6kY.png" alt="Schedule UI Preview" width="400"/>
</div>

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/your-username/tu-schedule.git
cd tu-schedule
npm install
ng serve
```

Visit [http://localhost:4200](http://localhost:4200) in your browser.

---

