import {gql} from "@apollo/client";


export const UPDATE_PASSWORD = gql`
    mutation UpdatePassword($email: String!, $password: String!) {
        resetPassword(email: $email, password: $password) {
            status
            message
        }
    }
`

export const ADD_Student = gql`
    mutation AddStudent(
        $name: String
        $email: String
        $password: String
    ) {
        addStudent(
            name: $name
            email: $email
            password: $password
        ) {
            id
            name
            email
            password
            profile{
                username
                email
            }
        }
    }
`;

export const ADD_Tutor = gql`
    mutation AddTutor(
        $name: String
        $email: String
        $password: String
    ) {
        addTutor(
            name: $name
            email: $email
            password: $password
        ) {
            id
            name
            email
            password
            profile{
                username
                email
            }
        }
    }
`;

export const UPDATE_STUDENT_PROFILE = gql`
    mutation UpdateStudentProfile(
        $id: ID!
        $email: String!
        $thumbnail: String
        $username: String
        $phone: String
        $address: String
        $timeZone: String
        $biography: String
    ) {
        updateStudentProfile(
            id: $id
            email: $email
            thumbnail: $thumbnail
            username: $username
            phone: $phone
            address: $address
            timeZone: $timeZone
            biography: $biography
        ) {
            id
            thumbnail
            email
            username
            phone
            address
            timeZone
            biography
        }
    }
`;

export const UPDATE_TUTOR_PROFILE = gql`
    mutation UpdateTutorProfile(
        $id: ID!
        $email: String!
        $thumbnail: String
        $username: String
        $phone: String
        $address: String
        $timeZone: String
        $professionalBio:String
        $experienceSummary: String
        $courseCanTeach: String
    ) {
        updateTutorProfile(
            id: $id
            email: $email
            thumbnail: $thumbnail
            username: $username
            phone: $phone
            address: $address
            timeZone: $timeZone
            professionalBio: $professionalBio
            experienceSummary: $experienceSummary
            courseCanTeach: $courseCanTeach
        ) {
            id
            email
            thumbnail
            username
            phone
            address
            timeZone
            professionalBio
            experienceSummary
            courseCanTeach
        }
    }
`;

export const Approval_Application = gql`
    mutation ApprovalApplication(
        $id: ID!,
        $tutorId: String
    ) {
        approveApplication(
            id: $id,
            tutorId: $tutorId
        ) {
            status
        }
    }
`
export const Reject_Application = gql`
    mutation RejectApplication(
        $id: ID!,
        $tutorId: String
    ) {
        approveApplication(
            id: $id,
            tutorId: $tutorId
        ) {
            status
        }
    }
`

export const Approval_Course_Application = gql`
    mutation ApprovalApplication(
      $id: ID!,
      $tutorId: String
      ) {
        approveCourseApplication(
          id: $id,
          tutorId: $tutorId
          ) {
            status
        }
    }
`
export const Reject_Course_Application = gql`
    mutation RejectApplication(
      $id: ID!,
      $tutorId: String
      ) {
        rejectCourseApplication(
          id: $id,
          tutorId: $tutorId
          ) {
            status
        }
    }
`


export const ADD_COURSE = gql`
    mutation AddCourse(
        $name: String!
        $description: String
        $comments: [String!]
        $thumbnail: String
        $studentIds: [String!]
        $tutorId: [String!]
        $price: Int
        $tags: [String!]
        $status: String
        $rate: [String]
        $score: String
    ) {
        addCourse(
            name: $name
            description: $description
            comments: $comments
            thumbnail: $thumbnail
            studentId: $studentIds
            tutorId: $tutorId
            price: $price
            tags: $tags
            status: $status
            rate: $rate
            score: $score
        ) {
            name
            description
            comments
            thumbnail
            students {
                id
                name
            }
            studentId
            tutors {
                id
                name
            }
            tutorId
            price
            tags
            status
            rate
            score
        }
    }
`;

export const DELETE_COURSE = gql`
    mutation DeleteCourse($id: ID!) {
        deleteCourse(id: $id) {
            id
        }
    }
`;

export const DELETE_Student = gql`
    mutation DeleteStudent($id: ID!, $email:String!) {
        deleteStudent(id: $id, email: $email) {
            id
            email
        }
    }
`;

export const DELETE_Tutor = gql`
    mutation DeleteTutor($id: ID!,$email:String!) {
        deleteStudent(id: $id,email: $email) {
            id
            email
        }
    }
`;

export const ADD_Application = gql`
    mutation AddApplication(
        $tutorId: String
        $name: String
        $email: String
        $courseId: String
        $courseName: String
        $description: String
        $appointmentDate: String
        $startTime: String
        $endTime: String
    ) {
        addApplication(
            tutorId: $tutorId
            name: $name
            email: $email
            courseId: $courseId
            courseName: $courseName
            description: $description
            appointmentDate: $appointmentDate
            startTime: $startTime
            endTime: $endTime
        ) {
            id
            tutorId
            name
            email
            courseId
            courseName
            description
            appointmentDate
            startTime
            endTime
        }
    }
`;


export const REGISTER_COURSE_FOR_STUDENT = gql`
    mutation RegisterCourseForStudent($studentId: ID!, $courseId: ID!) {
        registerCourseForStudent(studentId: $studentId, courseId: $courseId) {
            status
        }
    }
`;

export const REGISTER_COURSE_FOR_TUTOR = gql`
    mutation RegisterCourseForTutor($tutorId: ID!, $courseId: ID!) {
        registerCourseForTutor(tutorId: $tutorId, courseId: $courseId) {
            id
            name
            courses {
                id
                name
            }
        }
    }
`;

export const PAY_THE_COURSE = gql`
    mutation PayTheCourse($studentId: ID!, $courseId: ID!) {
        payTheCourse(studentId: $studentId, courseId: $courseId) {
            id
            name
            students {
                id
            }
        }
    }
`;

export const ADD_APPOINTMENT = gql`
    mutation AddAppointment(
        $studentId: String,
        $courseId: String,
        $tutorId: String,
        $startTime: String,
        $endTime: String,
        $appointmentDate: String
    ) {
        addAppointment(
            studentId: $studentId
            courseId: $courseId
            tutorId: $tutorId
            startTime: $startTime
            endTime: $endTime
            appointmentDate: $appointmentDate
        ) {
            studentId
            courseId
            tutorId
            startTime
            endTime
            appointmentDate
        }
    }
`;

export const ADD_IDENTITY = gql`
    mutation AddIdentity(
        $email: String!,
        $userType: UserType!
    ) {
        addIdentity(
            email: $email,
            userType: $userType
        ) {
            email
            userType
        }
    }
`;

export const Delete_Appointment = gql`
    mutation DeleteAppointment($id: ID!,$studentId: String!, $tutorId: String!) {
        deleteAppointment(id: $id,studentId: $studentId, tutorId: $tutorId) {
            id
            studentId
            tutorId
        }
    }`

export const ADD_RATE = gql`
    mutation AddRate(
        $id: ID!,
        $rate: String!
    ) {
        addRate(
            id: $id
            rate: $rate
        ) {
            id
            rate
            score
        }
    }
`;

export const CreateConversation = gql`
    mutation CreateConversation(
        $studentId: String!,
        $tutorId: String!
    ) {
        createConversation(
            studentId: $studentId
            tutorId: $tutorId
        ) {
            id
            studentId
            tutorId
        }
    }
`;

export const NewMessage = gql`
    mutation NewMessage(
        $conversationId: String!,
        $userId: String!,
        $content: String!
    ) {
        newMessage(
            conversationId: $conversationId
            userId: $userId
            content: $content
        ) {
            id
            conversationId
            userId
            content
        }
    }
`;

