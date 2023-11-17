import {gql} from "@apollo/client";


export const Get_Profile = gql`
query GetProfile($id: String!) {
    getUserProfile(id: $id) {
        __typename
        ... on StudentProfile {
            username
            thumbnail
        }
        ... on TutorProfile {
            username
            thumbnail
        }
    }
}
`;

export const Find_User = gql`
    query finduser($id: String!) {
        finduser(id: $id) {
            status
            message
        }
    }
`

export const Find_User_By_Email = gql`
    query finduser($email: String!) {
        finduserbyEmail(email: $email) {
            status
            message
        }
    }
`

export const Auth_Student = gql`
    query Student($email: String!) {
        student(email: $email) {
            id
            name
            email
            password
        }
    }
`;

export const Auth_Tutor = gql`
    query Tutor($email: String!) {
        tutor(email: $email) {
            id
            name
            email
            password
        }
    }
`;

export const Auth_SiteAdmin = gql`
    query SiteAdmin($email: String!) {
        siteAdmin(email: $email) {
            id
            name
            email
            password
        }
    }
`;

export const Auth_TutorAdmin = gql`
    query TutorAdmin($email: String!) {
        tutorAdmin(email: $email) {
            id
            name
            email
            password
        }
    }
`;

export const GET_STUDENT = gql`
    query Student($id: String!) {
        getStudent(id: $id) {
            id
            name
            email
            password
            courses {
                id
                name
            }
        }
    }
`;

export const GET_TUTOR = gql`
    query Student($id: String!) {
        getTutor(id: $id) {
            id
            name
            email
            password
            courses {
                id
                name
            }
        }
    }
`;

export const GET_STUDENTS_IN_COURSE = gql`
    query Course($id: String!) {
        course(id: $id) {
            students {
                name
                email
                id
            }
        }
    }
`

export const GET_COURSE = gql`
    query Course($id: String!) {
        course(id: $id) {
            name
            description
            comments
            thumbnail
            status
            students {
                name
                email
                id
                profile {
                    id,
                    thumbnail
                }
            }
            tutors {
                id
                name
                email
                profile {
                    id,
                    thumbnail
                }
            }
            tags
            price
            rate
            score
        }
    }
`



export const GET_TUTORS_BY_COURSE = gql`
    query Course($id: String!) {
        course(id: $id) {
            name
            tutors {
                id
                name
                email
            }
        }
    }
`

export const GET_COURSES = gql`
    query Course {
        courses {
            id
            name
            description
            comments
            thumbnail
            students {
                id,
                name,
                email,
            }
            tutors {
                id,
                name,
                email,
            }
            tags
            status
            price
            rate
            score
        }
    }
`;

export const GET_StudentList = gql`
    query Student {
        getStudentList {
            id
            email
            name
            courses {
                id
                name
            }
        }
    }
`;

export const GET_TutorList = gql`
    query Tutor {
        getTutorList {
            id
            email
            name
            courses {
                id
                name
            }
        }
    }
`;

export const GET_STUDENT_PROFILE = gql`
    query StudentProfile($id: String!) {
        getStudentProfile(id: $id) {
            id
            thumbnail
            email
            username
            phone
            address
            timeZone
            biography
            accountBalance
        }
    }
`;

export const GET_TUTOR_PROFILE = gql`
    query TutorProfile($id: String!) {
        getTutorProfile(id: $id) {
            id
            thumbnail
            email
            username
            phone
            address
            timeZone
            accountBalance
            experienceSummary
            courseCanTeach
            professionalBio
        }
    }
`;

export const GET_APPLICATION = gql`
    query TutorApplication {
        getApplication {
            id
            tutorId
            name
            email
            courseId
            courseName
            description
            status
        }
    }
`;

export const GET_APPLICATION_BY_ID = gql`
    query TutorApplication($id: String!) {
        getSingleApplication(id: $id) {
            id
            tutorId
            name
            email
            courseId
            courseName
            status
            description
            startTime
            endTime
        }
    }
`

export const GET_Appointment = gql`
    query Appointment($id: String!) {
        getAppointmentById(id: $id) {
            id
            tutorName
            tutorEmail
            studentName
            studentEmail
            startTime
            endTime
            courseName
        }
    }
`;

export const GET_APPOINTMENT = gql`
    query Appointment {
        getAppointments {
            id
            tutorName
            tutorEmail
            studentName
            studentEmail
            date
            startTime
            endTime
            courseName
        }
    }
`;

export const FILTER_COURSES = gql`
    query FilterCourses($tags: [String!]) {
        filterCourses(tags: $tags) {
            id
            name
            description
            tags
            thumbnail
        }
    }
`;

export const GET_USERTYPE = gql`
    query GetUserType($email: String!) {
        getUserType(email: $email) {
            userType
        }
    }
`;

export const GET_SUCCESSFUL_RESERVATION = gql`
    query GetSuccessfulReservation($id: String!) {
        getSuccessfulReservation(id: $id) {
            courseName
        }
    }
`;

export const GET_STUDENT_INFO = gql`
    query GetStudentInfo($tutorId: String!) {
        getStudentInfo(tutorId: $tutorId) {
            students {
                id
                email
            }
        }
    }
`;

export const GET_TUTOR_COURSES = gql`
  query GetTutorCourses($tutorId: String!) {
    getTutorCourses(tutorId: $tutorId) {
        id
        name
        description
        status
    }
  }
`;

export const GET_STUDENT_COURSES = gql`
  query GetStudentCourses($studentId: String!) {
    getStudentCourses(studentId: $studentId) {
        id
        name
        description
        status
    }
  }
`;

export const GET_SCORE = gql`
    query GetScore($id: String!) {
        getScore(id: $id) {
            score
        }
    }
`;

export const GET_TUTOR_NOTIFICATION = gql`
    query GetTutorNotification($tutorId: String!) {
        getTutorNotification(tutorId: $tutorId) {
            content
        }
    }
`;

export const GET_STUDENT_NOTIFICATION = gql`
    query GetStudentNotification($studentId: String!) {
        getStudentNotification(studentId: $studentId) {
            content
        }
    }
`;

export const Get_Conversations = gql`
    query GetConversations($userId: String!) {
        getConversations(userId: $userId) {
            id
            student {
                id
                name
                email
                profile {
                    thumbnail
                }
            }
            tutor{
                id
                name
                email
                profile {
                    thumbnail
                }
            }
        }
    }
`
export const Get_Messages = gql`
    query GetMessages($conversationId: String!) {
        getMessages(conversationId: $conversationId) {
            id
            userId
            content
            createdAt
        }
    }
`