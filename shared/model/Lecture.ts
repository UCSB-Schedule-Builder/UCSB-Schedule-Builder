import { Section } from "./Section"

export class Lecture extends Section
{
  sections: Section[]

  constructor(section: Section)
  {
    super(section.id, section.enrollCode, section.teacherName, section.times)
    this.sections = []
  }

  addSection(section: Section)
  {
    this.sections.push(section)
  }
}
