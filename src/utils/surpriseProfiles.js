const surpriseProfiles = [
  { name: 'Alex', currentRole: 'Student', ageRange: '18-24', interests: ['photography', 'travel', 'writing'], currentCity: 'Portland', dreamJob: 'Photojournalist', skills: ['visual storytelling', 'digital editing'], biggestGoal: 'Document meaningful stories' },
  { name: 'Sarah', currentRole: 'Teacher', ageRange: '25-34', interests: ['robotics', 'AI', 'education'], currentCity: 'Austin', dreamJob: 'EdTech Founder', skills: ['curriculum design', 'Python'], biggestGoal: 'Transform how children learn' },
  { name: 'Marcus', currentRole: 'Doctor', ageRange: '30-40', interests: ['gaming', 'music', 'fitness'], currentCity: 'Chicago', dreamJob: 'Game Developer', skills: ['problem solving', 'pattern recognition'], biggestGoal: 'Create worlds that inspire' },
  { name: 'Elena', currentRole: 'Accountant', ageRange: '25-34', interests: ['painting', 'sustainability', 'cooking'], currentCity: 'Seattle', dreamJob: 'Sustainable Restaurant Owner', skills: ['financial planning', 'attention to detail'], biggestGoal: 'Live sustainably and creatively' },
  { name: 'James', currentRole: 'Marketing Analyst', ageRange: '25-34', interests: ['astronomy', 'hiking', 'philosophy'], currentCity: 'Denver', dreamJob: 'Astrophysicist', skills: ['data analysis', 'research'], biggestGoal: 'Understand the universe' },
  { name: 'Priya', currentRole: 'Software Engineer', ageRange: '25-34', interests: ['yoga', 'neuroscience', 'dance'], currentCity: 'San Francisco', dreamJob: 'Neuroscience Researcher', skills: ['coding', 'analytical thinking'], biggestGoal: 'Bridge technology and the mind' },
  { name: 'Chen', currentRole: 'Chef', ageRange: '25-34', interests: ['molecular gastronomy', 'sustainability', 'travel'], currentCity: 'New York', dreamJob: 'Food Science Innovator', skills: ['culinary arts', 'chemistry'], biggestGoal: 'Revolutionize sustainable dining' },
  { name: 'Aisha', currentRole: 'Graphic Designer', ageRange: '18-24', interests: ['VR', 'architecture', 'fashion'], currentCity: 'Miami', dreamJob: 'Virtual World Architect', skills: ['3D modeling', 'visual design'], biggestGoal: 'Design immersive digital spaces' },
];

export function getRandomProfile() {
  return surpriseProfiles[Math.floor(Math.random() * surpriseProfiles.length)];
}
