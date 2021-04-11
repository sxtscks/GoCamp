import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'Big fish',
    imgPath:
      'https://toptimes.ru/wp-content/uploads/2019/04/riba_taimen.jpg',
  },
  {
    label: 'Bear',
    imgPath:
      'https://s1.1zoom.ru/b6149/970/Brown_Bears_Water_Lake_Kamchatka_Peninsula_Russia_531779_1366x768.jpg',
  },
  {
    label: 'Squirell',
    imgPath:
      'https://oxothik.ru/userimages/image/articles/belka3.jpg',
  },
  {
    label: 'Camp river',
    imgPath:
      'https://kudapoedymedia.s3.eu-west-1.amazonaws.com/wp-content/uploads/2020/07/06192455/%D0%B1%D1%8D%D0%BA%D0%BA%D0%B0%D0%BD%D1%82%D1%80%D0%B8-%D0%BA%D0%B5%D0%BC%D0%BF%D0%B8%D0%BD%D0%B3-2-800x445.jpg',
  },
  {
    label: 'Forest',
    imgPath:
      'https://aif-s3.aif.ru/images/018/001/a0f3b543454741dd300f0e32f5eab41b.jpg',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 600,
    display: 'block',
    maxWidth: 800,
    overflow: 'hidden',
    width: '100%',
  },
}));

function TripPhotoSlider() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        // steps={maxSteps}
        // position="static"
        // variant="text"
        // activeStep={activeStep}
        // nextButton={
        //   <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
        //     Next
        //     {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        //   </Button>
        // }
        // backButton={
        //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        //     {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        //     Back
        //   </Button>
        // }
      />
    </div>
  );
}

export default TripPhotoSlider;
