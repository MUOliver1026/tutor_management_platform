export const typeDefs = `#graphql 
union UserProfile = StudentProfile | TutorProfile


enum UserType {
    Student
    Tutor
    SiteAdmin
    TutorAdmin
}

type PasswordResetResponse {
    status: Boolean!
    message: String
}

type Student {
    id:    ID!
    name: String
    email: String
    password: String
    courses: [Course]
    conversation: [Conversation]
    profile: StudentProfile
}

type Tutor {
    id:    ID!
    name: String
    email: String
    password: String
    courses: [Course]
    profile: TutorProfile
    conversation: [Conversation]
}

type SiteAdmin {
    id:    ID!
    name: String
    email: String
    password: String
}


type TutorAdmin {
    id:    ID!
    name: String
    email: String
    password: String
}


type Course {
    id:   ID!
    name: String
    description: String
    comments: [String]
    thumbnail: String
    students: [Student]
    studentId: [String]
    tutors: [Tutor]
    tutorId: [String]
    price: Int
    tags: [String]
    status: String
    rate: [String]
    score: String
}


type StudentProfile {
    id: ID!
    thumbnail: String
    email: String
    username: String
    phone: String
    address: String
    timeZone: String
    biography: String
    accountBalance: Int
}

type TutorProfile {
    id: ID!
    thumbnail: String
    email: String
    username: String
    phone: String
    address: String
    timeZone: String
    accountBalance: Int
    professionalBio:String
    experienceSummary: String
    courseCanTeach: String
}

type TutorApplication {
    id: ID!
    tutorId: String
    name: String
    email: String
    courseId: String
    courseName: String
    description: String
    status:String
    appointmentDate:String
    startTime:String
    endTime:String
}

type Appointment {
    id: ID!
    courseId: String
    courseName: String
    tutorId: String
    tutorName: String
    tutorEmail: String
    studentId: String
    studentName: String
    studentEmail: String
    duration: Int
    date: String
    startTime: String
    endTime: String
    appointmentDate: String
}

type RegisterCourse {
    id: ID!
    studentId: String
    student: Student
    courseId: String
    course: Course
    date: String
    status: String
}

type Identity {
    id: ID!
    email: String!
    userType: UserType!
}

type Notification {
    id: ID!
    content: String
    students: [Student]
    studentId: [String]
    tutors: [Tutor]
    tutorId: [String]
}

type Conversation {
    id: ID!
    student: Student
    studentId: String
    tutor: Tutor
    tutorId: String
    messages: [Message]
}

type Message {
    id: ID!
    conversation: Conversation
    conversationId: String
    userId: String
    content: String
    createdAt: String
}


type Query {
    finduserbyEmail(email: String): PasswordResetResponse
    getUserProfile(id:String): UserProfile
    getMessages(conversationId: String!): [Message]
    getConversations(userId: String!): [Conversation]
    finduser(id: String): PasswordResetResponse
    student(email: String): Student
    tutor(email: String): Tutor
    getStudent(id: String!): Student
    getTutor(id: String!): Tutor
    siteAdmin(email: String): SiteAdmin
    tutorAdmin(email: String): TutorAdmin
    course(id: String!): Course
    courses: [Course]
    getStudentList:[Student]
    getTutorList:[Tutor]
    getStudentProfile(id: String!): StudentProfile
    getTutorProfile(id: String!): TutorProfile
    getApplication: [TutorApplication]
    getSingleApplication(id: String!): TutorApplication
    getAppointments: [Appointment]
    filterCourses(
        tags: [String!],
    ): [Course]
    getUserType(email: String!): Identity
    getSuccessfulReservation(id: String!): [Appointment]
    getStudentInfo(tutorId: String!): [Course]
    getAppointmentById(id: String!): Appointment
    getTutorCourses(tutorId: String!): [Course]
    getStudentCourses(studentId: String!): [Course]
    getScore(id: String!): Course
    getTutorNotification(tutorId: String!): [Notification]
    getStudentNotification(studentId: String!): [Notification]
  }

type Mutation {
    createConversation(studentId: String, tutorId: String): Conversation
    newMessage(conversationId: String, userId: String, content: String): Message
    deleteAppointment(id: ID!,studentId:String,tutorId:String): Appointment
    approveApplication(id: ID!, tutorId: String): TutorApplication
    rejectApplication(id: ID!, tutorId: String): TutorApplication
    approveCourseApplication(id: ID!, tutorId: String): Course
    rejectCourseApplication(id: ID!, tutorId: String): Course
    addStudent (name:String, email:String, password:String) : Student
    addTutor (name:String, email:String, password:String) : Tutor
    updateStudentProfile(id: ID!,
        email: String, thumbnail: String, username: String, phone: String,
        address: String, timeZone: String, biography: String
    ) : StudentProfile
    updateTutorProfile(
        id: ID!,
        email: String, thumbnail: String, username: String, phone: String,
        address: String, timeZone: String,  experienceSummary: String,
        courseCanTeach: String, professionalBio: String
    ) : TutorProfile
    addCourse(name: String!, description: String, comments: [String],
        thumbnail: String, studentId: [String], tutorId: [String], price: Int, tags: [String], status: String, rate: [String], score: String
    ) : Course
    deleteCourse(id: ID!): Course
    deleteStudent(id: ID!, email:String): Student
    deleteTutor(id: ID!, email:String): Tutor
    addApplication(
        name: String, 
        email: String, 
        courseName: String,
        description:String,
        appointmentDate:String,
        tutorId:String,
        courseId:String,
        startTime:String,
        endTime:String
    ) : TutorApplication
    registerCourseForStudent(studentId: ID!, courseId: ID!): RegisterCourse
    registerCourseForTutor(tutorId: ID!, courseId: ID!): Tutor
    payTheCourse(studentId: ID!, courseId: ID!): Course
    resetPassword(email: String!, password: String!): PasswordResetResponse
    addAppointment(
        courseId: String,
        tutorId: String
        studentId: String
        duration: Int
        date: String
        startTime: String
        endTime: String
        appointmentDate: String
    ): Appointment
    addIdentity(email: String, userType: UserType): Identity
    addRate(id: ID!, rate: String): Course
}
`;
