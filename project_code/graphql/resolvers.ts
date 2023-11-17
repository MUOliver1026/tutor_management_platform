import {Context} from "@/pages/api/graphql";

export const resolvers = {
    UserProfile: {
        __resolveType(userProfile:any, context:any, info:any) {
            if (userProfile.studentId) {
                return 'StudentProfile';
            }
            else if (userProfile.tutorId) {
                return 'TutorProfile';
            }
            return null;
        }
    },
    Query: {
        getUserProfile: async (_parent: any, args: any, context: Context) => {
            const studentProfile = await context.prisma.studentProfile.findUnique({
                where: {studentId: args.id,},
            });
            const tutorProfile = await context.prisma.tutorProfile.findUnique({
                where: {tutorId: args.id,},
            });
            if (studentProfile) {
                return studentProfile;
            } else if (tutorProfile) {
                return tutorProfile;
            } else {
                return null;
            }
        },

        getMessages: async (_parent: any, args: any, context: Context) => {
            return context.prisma.message.findMany({
                where: {
                    conversationId: args.conversationId,
                },
            });
        },

        getConversations: async (_parent: any, args: any, context: Context) => {
            return context.prisma.conversation.findMany({
                where: {
                    OR: [
                        {studentId: args.userId},
                        {tutorId: args.userId},
                    ],
                },
                include: {
                    student: {
                        include: {
                            profile: true,
                        }
                    },
                    tutor: {
                        include: {
                            profile: true,
                        }
                    }
                }
            });
        },

        finduser: async (_parent: any, args: any, context: Context) => {

            const student = await context.prisma.student.findUnique({
                where: {id: args.id},
            });

            const tutor = await context.prisma.tutor.findUnique({
                where: {id: args.id},
            });

            const siteAdmin = await context.prisma.siteAdmin.findUnique({
                where: {id: args.id},
            });


            const tutorAdmin = await context.prisma.tutorAdmin.findUnique({
                where: {id: args.id},
            });

            if (student || tutor || siteAdmin || tutorAdmin) {
                return {
                    status: 1,
                    message: "find user successfully",
                };
            } else {
                return {
                    status: 0,
                    message: "Do not find user",
                };
            }
        },

        finduserbyEmail: async (_parent: any, args: any, context: Context) => {

            const student = await context.prisma.student.findUnique({
                where: {email: args.email},
            });

            const tutor = await context.prisma.tutor.findUnique({
                where: {email: args.email},
            });

            const siteAdmin = await context.prisma.siteAdmin.findUnique({
                where: {email: args.email},
            });


            const tutorAdmin = await context.prisma.tutorAdmin.findUnique({
                where: {email: args.email},
            });

            if (student || tutor || siteAdmin || tutorAdmin) {
                return {
                    status: 1,
                    message: "find user successfully",
                };
            } else {
                return {
                    status: 0,
                    message: "Do not find user",
                };
            }
        },

        getStudent: async (_parent: any, args: any, context: Context) => {
            return context.prisma.student.findUnique({
                where: {
                    id: args.id,
                },
            });},

        getTutor: async (_parent: any, args: any, context: Context) => {
            return context.prisma.tutor.findUnique({
                where: {
                    id: args.id,
                },
            });},

        //auth student by email
        student: async (_parent: any, args: any, context: Context) => {
            return context.prisma.student.findUnique({
                where: {
                    email: args.email,
                },
            });
        },

        //auth tutor by email
        tutor: async (_parent: any, args: any, context: Context) => {
            return context.prisma.tutor.findUnique({
                where: {
                    email: args.email,
                },
            });
        },

        //auth siteAdmin by email
        siteAdmin: async (_parent: any, args: any, context: Context) => {
            return context.prisma.siteAdmin.findUnique({
                where: {
                    email: args.email,
                },
            });
        },

        //auth siteAdmin by email
        tutorAdmin: async (_parent: any, args: any, context: Context) => {
            return context.prisma.tutorAdmin.findUnique({
                where: {
                    email: args.email,
                },
            });
        },

        // get course by id
        course: async (_parent: any, args: any, context: Context) => {
            return context.prisma.course.findUnique({
                where: {
                    id: args.id,
                },
                include: {
                    students: {
                        include: {
                            profile: true,
                        }
                    },
                    tutors: {
                        include: {
                            profile: true,
                        }
                    }
                }
            });
        },


        //get course list
        courses: async (_parent: any, args: any, context: Context) => {
            return context.prisma.course.findMany(
                {
                    include: {
                        students: true,
                        tutors: true,
                    }
                }
            );
        },


        //get student list
        getStudentList: async (_parent: any, args: any, context: Context) => {
            return context.prisma.student.findMany({
                include: {
                    courses: true
                }
            });
        },

        //get tutor list
        getTutorList: async (_parent: any, args: any, context: Context) => {
            return context.prisma.tutor.findMany({
                include: {
                    courses: true
                }
            });
        },


        //get student profile
        getStudentProfile: async (_parent: any, args: any, context: Context) => {
            return context.prisma.studentProfile.findUnique({
                where: {
                    studentId: args.id,
                },
            });
        },

        //get tutor profile
        getTutorProfile: async (_parent: any, args: any, context: Context) => {
            return context.prisma.tutorProfile.findUnique({
                where: {
                    tutorId: args.id,
                },
            });
        },


        //get Application
        getApplication: async (_parent: any, args: any, context: Context) => {
            return context.prisma.tutorApplication.findMany()
        },

        getSingleApplication: async (_parent: any, args: any, context: Context) => {
            return context.prisma.tutorApplication.findUnique({
                where: {
                    id: args.id,
                }
            })
        },

        getAppointmentById: async (_parent: any, args: any, context: Context) => {
            return context.prisma.appointment.findUnique({
                where: {
                    id: args.id,
                },
            });
        },

        //get consultation
        getAppointments: async (_parent: any, args: any, context: Context) => {
            return context.prisma.appointment.findMany();
        },

        //filter
        filterCourses: async (_parent: any, args: any, context: Context) => {

            const filteredCourses = await context.prisma.course.findMany({
                where: {
                    tags: {
                        hasSome: args.tags,
                    },
                },
            });

            return filteredCourses;
        },

        //get user type
        getUserType: async (_parent: any, args: any, context: Context) => {
            const identity = await context.prisma.identity.findUnique({
                where: {email: args.email,},
            });
            if (!identity) {
                throw new Error('No user found with this email!');
            }
            return identity;
        },


        getStudentInfo: async (_parent: any, args: any, context: Context) => {
            const tutorId = args.tutorId;
            const courses = await context.prisma.course.findMany({
                where: {
                    tutorId: {
                        has: tutorId
                    }
                },

                include: {
                    students: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            profile: true
                        }
                    },
                }
            });

            return courses;
        },

        getTutorCourses: async (_parent: any, args: any, context: Context) => {
            const tutorId = args.tutorId;
            const courses = await context.prisma.course.findMany({
                where: {
                    tutorId: {
                        has: tutorId
                    }
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                }
            });

            return courses;
        },

        getStudentCourses: async (_parent: any, args: any, context: Context) => {
            const studentId = args.studentId;
            const courses = await context.prisma.course.findMany({
                where: {
                    studentId: {
                        has: studentId
                    }
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                }
            });
            return courses;
        },

        //get score
        getScore: async (_parent: any, args: any, context: Context) => {
            return context.prisma.course.findUnique({
                where: {
                    id: args.id,
                },
                select: {
                    score: true,
                }
            });
        },

        //get tutor notification
        getTutorNotification: async (_parent: any, args: any, context: Context) => {
            const tutorId = args.tutorId;
            const notifications = await context.prisma.notification.findMany({
                where: {
                    tutorId: {
                        has: tutorId
                    }
                },
                select: {
                    content: true,
                }
            });
            return notifications;
        },

        //get student notification
        getStudentNotification: async (_parent: any, args: any, context: Context) => {
            const studentId = args.studentId;
            const notifications = await context.prisma.notification.findMany({
                where: {
                    studentId: {
                        has: studentId
                    }
                },
                select: {
                    content: true,
                }
            });
            return notifications;
        }
    },


    Mutation: {

        resetPassword: async (_parent: any, args: any, context: Context) => {
            let userFound = false;

            const student = await context.prisma.student.findUnique({
                where: {email: args.email},
            });
            if (student) {
                await context.prisma.student.update({
                    where: {email: args.email},
                    data: {password: args.password},
                });
                userFound = true;
            }

            const tutor = await context.prisma.tutor.findUnique({
                where: {email: args.email},
            });
            if (tutor) {
                await context.prisma.tutor.update({
                    where: {email: args.email},
                    data: {password: args.password},
                });
                userFound = true;
            }

            const siteAdmin = await context.prisma.siteAdmin.findUnique({
                where: {email: args.email},
            });
            if (siteAdmin) {
                await context.prisma.siteAdmin.update({
                    where: {email: args.email},
                    data: {password: args.password},
                });
                userFound = true;
            }

            const tutorAdmin = await context.prisma.tutorAdmin.findUnique({
                where: {email: args.email},
            });
            if (tutorAdmin) {
                await context.prisma.tutorAdmin.update({
                    where: {email: args.email},
                    data: {password: args.password},
                });
                userFound = true;
            }

            if (userFound) {
                return {
                    status: 1,
                    message: "Reset password successfully",
                };
            } else {
                return {
                    status: 0,
                    message: "Reset password failed",
                };
            }
        },

        // add user
        addStudent: async (_parent: any, args: any, context: Context) => {
            const student = await context.prisma.student.create({
                data: {
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    profile: {
                        create: {
                            username: args.name,
                            email: args.email,
                            accountBalance: 1000000
                        }
                    },
                },
                select: {
                    id: true
                }
            });
            return student;
        },


        // add tutor
        addTutor: async (_parent: any, args: any, context: Context) => {
            const tutor = await context.prisma.tutor.create({
                data: {
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    profile: {
                        create: {
                            username: args.name,
                            email: args.email
                        }
                    },
                },
                select: {
                    id: true
                }
            });
            return tutor;
        },

        // update student profile
        updateStudentProfile: async (_parent: any, args: any, context: Context) => {
            const {email, thumbnail, username, phone, address, timeZone, biography, id} = args;

            const existingProfile = await context.prisma.studentProfile.findUnique({
                where: {id: args.id,},
            });


            if (!existingProfile) {
                throw new Error('Student profile not found');
            }

            if (email && existingProfile.email !== email) {
                throw new Error('Email address does not match the existing profile');
            }

            return context.prisma.studentProfile.update({
                where: {
                    id: args.id,
                },
                data: {
                    thumbnail: args.thumbnail,
                    username: args.username,
                    phone: args.phone,
                    address: args.address,
                    timeZone: args.timeZone,
                    biography: args.biography,
                },
            });
        },

        // update tutor profile
        updateTutorProfile: async (_parent: any, args: any, context: Context) => {
            return context.prisma.tutorProfile.update({
                where: {
                    id: args.id,
                },
                data: {
                    email: args.email,
                    thumbnail: args.thumbnail,
                    username: args.username,
                    phone: args.phone,
                    address: args.address,
                    timeZone: args.timeZone,
                    professionalBio: args.professionalBio,
                    experienceSummary: args.experienceSummary,
                    courseCanTeach: args.courseCanTeach,
                },
            });
        },


        addCourse: async (_parent: any, args: any, context: Context) => {

            const status = args.status === "Approved" ? "Approved" : "Pending";

            const notificationData = {
                tutorId: args.tutorId,
                content: "New course has been added!",
            };

            const courseCreate = {
                name: args.name,
                description: args.description,
                tags: args.tags,
                thumbnail: args.thumbnail,
                price: args.price,
                status: status,
                tutorId: args.tutorId,
                rate: args.rate,
                score: args.score,
            };

            return context.prisma.$transaction([
                context.prisma.notification.create({data: notificationData}),
                context.prisma.course.create({data: courseCreate}),
            ]);

        },

        deleteCourse: async (_parent: any, args: any, context: Context) => {
            try {
                await context.prisma.registerCourse.deleteMany({
                    where: {courseId: args.id},
                });


                return context.prisma.course.delete({
                    where: {
                        id: args.id,
                    }
                });
            } catch (error: any) {
                throw new Error(`Failed to delete course: ${error.message}`);
            }
        },

        // deleteStudent function
        deleteStudent: async (_parent: any, args: any, context: Context) => {
            try {
                const student = await context.prisma.student.findUnique({
                    where: {
                        id: args.id,
                    }
                });

                if (!student) {
                    throw new Error("Student not found");
                }

                // Begin a transaction
                const transaction = await context.prisma.$transaction(async (prisma) => {
                    // Remove the student from all courses
                    const courses = await prisma.course.findMany({
                        where: {
                            studentId: {
                                has: args.id,
                            },
                        },
                    });

                    for (const course of courses) {
                        const updatedStudentIds = course.studentId.filter(studentId => studentId !== args.id);
                        await prisma.course.update({
                            where: {
                                id: course.id,
                            },
                            data: {
                                studentId: {
                                    set: updatedStudentIds,
                                },
                            },
                        });
                    }


                    // Delete the student's profile
                    await prisma.studentProfile.delete({
                        where: {
                            studentId: args.id,
                        },
                    });

                    // Finally, delete the student
                    return prisma.student.delete({
                        where: {
                            id: args.id,
                        },
                    });
                });

                // The transaction resolves to the result of the student deletion
                return transaction;
            } catch (error) {
                throw new Error(`Failed to delete studentq`);
            }
        },


        deleteTutor: async (_parent: any, args: any, context: Context) => {
            try {
                const tutor = await context.prisma.tutor.findUnique({
                    where: {
                        id: args.id,
                    }
                });

                if (tutor) {
                    await context.prisma.tutorProfile.delete({
                        where: {
                            tutorId: args.id
                        }
                    });

                    await context.prisma.identity.delete({
                        where: {
                            email: args.id
                        }
                    });


                    return await context.prisma.tutor.delete({
                        where: {
                            id: args.id,
                        }
                    });
                } else {
                    throw new Error("Student not found");
                }
            } catch (error: any) {
                throw new Error(`Failed to delete student: ${error.message}`);
            }
        },

        // add application
        addApplication: async (_parent: any, args: any, context: Context) => {
            return context.prisma.tutorApplication.create({
                data: {
                    tutorId: args.tutorId,
                    name: args.name,
                    email: args.email,
                    courseId: args.courseId,
                    courseName: args.courseName,
                    description: args.description,
                    appointmentDate: args.appointmentDate,
                    startTime: args.startTime,
                    endTime: args.endTime,
                },
            });
        },

        approveApplication: async (_parent: any, args: any, context: Context) => {
            const notificationData = {
                tutorId: [args.tutorId],
                content: "Your application has been approved",
            };

            const tutorApplicationUpdateData = {
                where: {
                    id: args.id,
                },
                data: {
                    status: "Approved",
                },
            };

            return context.prisma.$transaction([
                context.prisma.notification.create({data: notificationData }),
                context.prisma.tutorApplication.update(tutorApplicationUpdateData)
            ]);
        },

        //
        rejectApplication: async (_parent: any, args: any, context: Context) => {

            const notificationData = {
                tutorId: [args.tutorId],
                content: "Your application has been rejected",
            };

            const tutorApplicationUpdateData = {
                where: {
                    id: args.id,
                },
                data: {
                    status: "Rejected",
                },
            };

            return context.prisma.$transaction([
                context.prisma.notification.create({ data: notificationData }),
                context.prisma.tutorApplication.update(tutorApplicationUpdateData)
            ]);
        },

        approveCourseApplication: async (_parent: any, args: any, context: Context) => {

            const notificationData = {
                tutorId: [args.tutorId],
                content: "Your application has been approved",
            };

            const courseApplicationUpdateData = {
                where: {
                    id: args.id,
                },
                data: {
                    status: "Approved",
                },
            };

            return context.prisma.$transaction([
                context.prisma.notification.create({data: notificationData }),
                context.prisma.course.update(courseApplicationUpdateData)
            ]);
        },

        // todo
        rejectCourseApplication: async (_parent: any, args: any, context: Context) => {
            
            const notificationData = {
                // courseId: [args.id],
                content: "Your application has been rejected",
            };

            const courseApplicationUpdateData = {
                where: {
                    id: args.id,
                },
                data: {
                    status: "Rejected",
                },
            };

            return context.prisma.$transaction([
                context.prisma.notification.create({ data: notificationData }),
                context.prisma.course.update(courseApplicationUpdateData)
            ]);
        },


        // Student enrol course
        registerCourseForStudent: async (_parent: any, args: any, context: Context) => {
            // Ensure the student and course exist
            const student = await context.prisma.student.findUnique({
                where: {id: args.studentId},
            });
            const course = await context.prisma.course.findUnique({
                where: {id: args.courseId},
            });
            if (!student || !course) {
                throw new Error("Student or Course not found");
            }

            // Register the course for the student by updating the relation
            return context.prisma.registerCourse.create({
                data: {
                    student: {
                        connect: {id: args.studentId},
                    },
                    course: {
                        connect: {id: args.courseId},
                    },
                    date: new Date().toISOString(),
                    status: "Success",
                },
            });
        },

        // Tutor enrol course
        registerCourseForTutor: async (_parent: any, args: any, context: Context) => {
            // Ensure the tutor and course exist
            const tutor = await context.prisma.tutor.findUnique({
                where: {id: args.tutorId},
            });
            const course = await context.prisma.course.findUnique({
                where: {id: args.courseId},
            });

            if (!tutor || !course) {
                throw new Error("Tutor or Course not found");
            }

            // Register the course for the tutor by updating the relation
            return context.prisma.tutor.update({
                where: {id: args.tutorId},
                data: {
                    courses: {
                        connect: {id: args.courseId},
                    },
                },
            });
        },

        // Student pays for the course
        payTheCourse: async (_parent: any, args: any, context: Context) => {
            // Ensure the student and course exist
            const student = await context.prisma.studentProfile.findUnique({
                where: {studentId: args.studentId},
            });
            const course = await context.prisma.course.findUnique({
                where: {id: args.courseId},
            });


            if (!student) {
                throw new Error("Student not found with ID: " + args.studentId);
            }
            if (!course) {
                throw new Error("Course not found with ID: " + args.courseId);
            }
            if (!course.price) {
                throw new Error("Course price unavailable: " + args.course.price);
            }

            // Ensure student's account balance is enough
            if (student.accountBalance < course.price) {
                throw new Error("Insufficient balance");
            }

            // Deduct the student's account balance
            const balance = student.accountBalance;
            const price = course.price;
            const newBalance = balance - price;
            await context.prisma.studentProfile.update({
                where: {studentId: args.studentId},
                data: {
                    accountBalance: newBalance
                }
            });

            // Register the course for the student by updating the relation
            return context.prisma.course.update({
                where: {id: args.courseId},
                data: {
                    students: {
                        connect: {id: args.studentId},
                    },
                },
            });
        },


        addAppointment: async (_parent: any, args: any, context: Context) => {
            const course = await context.prisma.course.findUnique({where: {id: args.courseId}});
            const tutor = await context.prisma.tutor.findUnique({where: {id: args.tutorId}});
            const student = await context.prisma.student.findUnique({where: {id: args.studentId}});

            const appointment = context.prisma.appointment.create({
                data: {
                    courseId: course?.id,
                    courseName: course?.name,
                    tutorId: tutor?.id,
                    tutorName: tutor?.name,
                    tutorEmail: tutor?.email,
                    studentId: student?.id,
                    studentName: student?.name,
                    studentEmail: student?.email,
                    date: new Date().toISOString(),
                    startTime: args.startTime,
                    endTime: args.endTime,
                },
            });
            const createNotification = context.prisma.notification.create({
                data:{
                    tutorId: [args.tutorId],
                    studentId: [args.studentId],
                    content: "You have a new appointment",
                },
            });
            return context.prisma.$transaction([
                appointment,
                createNotification,
            ]);

        },

        // todo update appointment notification

        deleteAppointment: async (_parent: any, args: any, context: Context) => {

            const deleteAppointment = context.prisma.appointment.delete({
                where: {
                    id: args.id,
                },
            });

            const createNotification = context.prisma.notification.create({
                data:{
                    tutorId: [args.tutorId],
                    studentId: [args.studentId],
                    content: "Your appointment has been cancelled",
                },
            });

            return context.prisma.$transaction([
                deleteAppointment,
                createNotification,
            ]);
        },

        //add identity
        addIdentity: async (_parent: any, args: any, context: Context) => {

            return context.prisma.identity.create({
                data: {
                    email: args.email,
                    userType: args.userType,
                },
            });
        },

        //add rate
        addRate: async (_parent: any, args: any, context: Context) => {

            const course = await context.prisma.course.findUnique({
                where: {
                    id: args.id,
                },
                select: {rate: true},
            });

            if (!course || !course.rate) {
                throw new Error("Course not found or rate field is not defined");
            }
            const updatedRateArray = [...course.rate, args.rate];
            const newAverageScore = updatedRateArray.reduce((acc, curr) => acc + parseFloat(curr), 0) / updatedRateArray.length;

            return context.prisma.course.update({
                where: {id: args.id},
                data: {
                    rate: updatedRateArray,
                    score: newAverageScore.toString(),
                },
            });
        },

        createConversation: async (_parent: any, args: any, context: Context) => {
            // Check if a conversation between the student and tutor already exists
            const existingConversation = await context.prisma.conversation.findFirst({
                where: {
                    studentId: args.studentId,
                    tutorId: args.tutorId,
                },
            });

            if (existingConversation) {
                return existingConversation;
            }

            // If no existing conversation is found, create a new one
            return context.prisma.conversation.create({
                data: {
                    studentId: args.studentId,
                    tutorId: args.tutorId,
                },
            });
        },


        newMessage: async (_parent: any, args: any, context: Context) => {
            return context.prisma.message.create({
                data: {
                    conversationId: args.conversationId,
                    userId: args.userId,
                    content: args.content,
                },
            });
        }
    }
}


