export const schoolOptions = [
  {
    label: 'Universities',
    options: [
      'University of Nairobi (UoN)',
      'Kenyatta University',
      'Strathmore University',
      'University of Oxford',
      'University of Cambridge',
      'Harvard University',
      'Massachusetts Institute of Technology (MIT)',
      'Stanford University',
      'University of Toronto',
      'University of Cape Town',
      'University of Ghana',
      'University of Lagos',
      'Makerere University',
      'University of Delhi',
      'University of Melbourne',
    ],
  },
  {
    label: 'Colleges and technical institutions',
    options: [
      'Kenya Technical Trainers College',
      'Technical University of Kenya',
      'Mombasa Technical and Vocational College',
      'Nairobi Technical and Vocational College',
      'Other college or technical institution',
    ],
  },
  {
    label: 'Bootcamps and private institutions',
    options: [
      'Moringa School',
      'ALX Africa',
      'African Leadership University',
      'Holberton School',
      'Andela Learning Community',
      'Pluralsight',
      'General Assembly',
      'Udacity',
      'Coursera',
      'Other bootcamp or private institution',
    ],
  },
  {
    label: 'High schools',
    options: ['Other high school'],
  },
] as const;

export const programmeOptions = [
  {
    label: 'University and technology degrees',
    options: [
      'Bachelor of Business Information Technology (BBIT)',
      'Bachelor of Science in Computer Science',
      'Bachelor of Information Technology',
      'Bachelor of Software Engineering',
      'Bachelor of Business Administration',
      'Bachelor of Data Science',
      'Master of Information Technology',
      'Master of Business Administration (MBA)',
      'PhD / Doctorate',
    ],
  },
  {
    label: 'College and diploma programmes',
    options: [
      'Diploma in Information Technology',
      'Diploma in Business Information Technology',
      'Diploma in Computer Science',
      'Certificate in Information Technology',
      'Certificate in Business',
      'Technical and Vocational Education and Training (TVET)',
      'Associate degree',
    ],
  },
  {
    label: 'Bootcamp and professional programmes',
    options: [
      'Software engineering bootcamp',
      'Data science bootcamp',
      'Cybersecurity bootcamp',
      'Cloud engineering bootcamp',
      'Web development bootcamp',
      'UX/UI design bootcamp',
      'Digital marketing programme',
      'Microsoft Azure certification track',
      'Other professional programme',
    ],
  },
  {
    label: 'School and other',
    options: ['High school programme', 'Self-directed learning', 'Other programme'],
  },
] as const;

export const allSchoolOptions = schoolOptions.flatMap((group) => group.options);
export const allProgrammeOptions = programmeOptions.flatMap((group) => group.options);
