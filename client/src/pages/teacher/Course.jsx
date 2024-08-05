import React,{useEffect,useState} from 'react'
import MiniDrawer from '../../components/Drawer';
import useTeacherAuthRedirect from '../../hooks/TeacherAuth';
import { Typography, Container, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';
import { fetchUser } from '../../features/teacher/teacherSlice';
import { useDispatch, useSelector } from 'react-redux';


function TeacherCourse() {
  useTeacherAuthRedirect()
    const dispatch = useDispatch();
  const teacherInfo = useSelector((state) => state.teacher.info);
    useEffect(() => {
        dispatch(fetchUser());
      
    }, [dispatch]);
    const courses = {
      'Flutter Development': {
        title: 'Flutter Development',
        description: `
          This course covers:
          - Introduction to Flutter
          - Dart Programming Language
          - Building UIs with Flutter Widgets
          - State Management
          - Networking and API Integration
          - Firebase Integration
          - Deploying Flutter Apps
  
          Roadmap:
          1. Learn Dart Programming Language
          2. Understand Flutter Basics
          3. Build User Interfaces with Widgets
          4. Manage State in Flutter
          5. Integrate with APIs
          6. Use Firebase for Backend Services
          7. Deploy Flutter Applications
        `,
        images: [
          'https://flutter.dev/assets/images/shared/brand/flutter/logo/flutter-lockup.png', // General image for the course
          'https://miro.medium.com/max/1200/1*vjPp4Q9INNzzBSl7KeRtDg.png', // Dart Programming
          'https://miro.medium.com/max/1400/1*2yH8cdedgf5M8OnIt2Pj5A.png', // Flutter Basics
          'https://flutter.dev/assets/ui/layout/grid-layout-9b0a27eb06fc0e8de5ef9ffb22acfe43cd8b6b32c4caa7c0f41747bdb528f1df.png', // Widgets
          'https://miro.medium.com/max/2000/1*ci_2xEM3TK34k0Fh_5OydA.png', // State Management
          'https://miro.medium.com/max/1200/1*72tN6oxK2JMC1F-7mdKj7g.png', // API Integration
          'https://firebase.google.com/images/social.png', // Firebase
          'https://miro.medium.com/max/2400/1*H9Dd5vwokQxb5Ke_qG8Efw.png', // Deployment
        ],
      },
      'Web And Mobile App Development': {
        title: 'Web And Mobile App Development',
        description: `
          This course covers:
          - HTML, CSS, and JavaScript
          - Frontend frameworks like React and Angular
          - Backend development with Node.js and Express
          - Mobile development with React Native
          - Databases like MongoDB and SQL
          - Deployment and DevOps
  
          Roadmap:
          1. Learn HTML, CSS, and JavaScript
          2. Master a frontend framework (React/Angular)
          3. Learn backend development with Node.js and Express
          4. Understand databases and how to use them (MongoDB/SQL)
          5. Learn mobile development with React Native
          6. Get familiar with deployment and DevOps practices
        `,
        images: [
          'https://scontent.fkhi17-1.fna.fbcdn.net/v/t39.30808-6/409036019_122094514016153270_4246027335015315877_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=N2g3NNRAyosQ7kNvgGYw4yg&_nc_ht=scontent.fkhi17-1.fna&oh=00_AYCZWbgUMrUM_8II59moy4e533ias4OM4PxZc1JvhGA1Bw&oe=66B47B1E', // General image for the course
          'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png', // JavaScript
          'https://reactjs.org/logo-og.png', // React
          'https://nodejs.org/static/images/logo.svg', // Node.js
          'https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg', // MongoDB
          'https://t3.ftcdn.net/jpg/04/82/07/90/360_F_482079087_jTfhGFhJgMeWt40zI9qhgjTQX7zXtLd0.jpg', // DevOps
        ],
      },
      'Graphic Designing': {
        title: 'Graphic Designing',
        description: `
          This course covers:
          - Fundamentals of Design
          - Typography
          - Color Theory
          - Adobe Photoshop
          - Adobe Illustrator
          - Branding and Identity
          - UX/UI Design
  
          Roadmap:
          1. Learn Design Fundamentals
          2. Understand Typography and Color Theory
          3. Master Adobe Photoshop
          4. Master Adobe Illustrator
          5. Learn Branding and Identity Design
          6. Understand UX/UI Design Principles
        `,
        images: [
          'https://scontent.fkhi17-1.fna.fbcdn.net/v/t39.30808-6/409036019_122094514016153270_4246027335015315877_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=N2g3NNRAyosQ7kNvgGYw4yg&_nc_ht=scontent.fkhi17-1.fna&oh=00_AYCZWbgUMrUM_8II59moy4e533ias4OM4PxZc1JvhGA1Bw&oe=66B47B1E', // General image for the course
          'https://upload.wikimedia.org/wikipedia/commons/a/a7/Web_fonts.png', // Typography
          'https://upload.wikimedia.org/wikipedia/commons/2/21/UX_Design.png',
          'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg', // Adobe Photoshop
          'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg', // Adobe Illustrator
          'https://upload.wikimedia.org/wikipedia/commons/f/f1/CorelDraw_Logo.png', // Branding
          'https://upload.wikimedia.org/wikipedia/commons/a/ad/Figma-1-logo.png', // UX/UI Design
        ],
      },
      'AWS Services': {
        title: 'AWS Services',
        description: `
          This course covers:
          - Introduction to AWS
          - AWS Management Console
          - EC2 Instances
          - S3 Storage
          - RDS Databases
          - VPC and Networking
          - Security and IAM
  
          Roadmap:
          1. Introduction to AWS Cloud
          2. Learn to Use AWS Management Console
          3. Understand EC2 Instances
          4. Master S3 Storage
          5. Learn RDS Databases
          6. Get Familiar with VPC and Networking
          7. Understand Security and IAM
        `,
        images: [
          'https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/Powered-by-logoStacked_350x150.4b85d33f1eb14b6e255cbbc81818d629a7f7a3a0.png', // General image for the course
          'https://miro.medium.com/max/1200/1*pjC_7g2lsh0BOl0yP4EdvA.png', // AWS Management Console
          'https://aws.amazon.com/ec2/', // EC2 Instances
          'https://aws.amazon.com/s3/', // S3 Storage
          'https://aws.amazon.com/rds/', // RDS Databases
          'https://aws.amazon.com/vpc/', // VPC and Networking
          'https://aws.amazon.com/iam/', // Security and IAM
        ],
      },
    };
  
    const renderCourseDescription = (courseName) => {
      const course = courses[courseName];
      return course ? (
        <Card sx={{ my: 3, width: '100%', borderRadius: 2 }}>
          <CardMedia
            component="img"
            height="200"
            image={course.images ? course.images[0] : course.image}
            alt={course.title}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {course.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" component="div" sx={{ whiteSpace: 'pre-line' }}>
              {course.description}
            </Typography>
            {course.images && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                {course.images.slice(1).map((image, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    height="100"
                    image={image}
                    alt={`Course step ${index + 1}`}
                    sx={{ width: '100%', objectFit: 'contain', m: 1 }}
                  />
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="error">
          No course outline available for {courseName}.
        </Typography>
      );
    };

    
  return (
    <>
            <MiniDrawer teacherInfo={teacherInfo} />
            <Container sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Course Outline
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {renderCourseDescription(teacherInfo?.course)}
          </Grid>
        </Grid>
      </Container>

    </>
  )
}

export default TeacherCourse