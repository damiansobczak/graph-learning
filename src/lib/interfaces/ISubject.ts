export interface Subject {
  created_at: string | null
  id: number
  title: string | null
}

export const initialSubjects: Subject[] = [{ id: 1, title: 'AngularJS', created_at: '' }];