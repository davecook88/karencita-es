import {
  Container,
  FormHelperText,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Typography,
  Checkbox,
  Button,
} from "@material-ui/core";
import List from "../../../components/List";
import clsx from "clsx";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { PlacementTestTypes } from "../../../interfaces/placementTest";
import {
  AddCircle,
  RemoveCircleOutline,
  RemoveCircleOutlined,
} from "@material-ui/icons";
import {
  PlacementTestModel,
  QuestionModel,
} from "../../../models/PlacementTest";
import dbConnect from "../../../utils/mongodb";
import { debounce } from "lodash";
import { TEST_CONFIG } from "../../../utils/config";

const useStyles = makeStyles({
  questionForm: {
    width: "100%",
    padding: "3em",
    margin: "2em",
    // minHeight: "50vh",
  },
});

const blankMultipleChoiceQuestionChoice: PlacementTestTypes.MultipleChoiceQuestionChoice =
  {
    displayValue: "",
    id: "",
  };

const MultipleChoiceQuestionForm = ({
  question,
  setQuestion,
  answer,
  setAnswer,
}: {
  question: PlacementTestTypes.MultipleChoiceQuestion;
  setQuestion: React.Dispatch<
    React.SetStateAction<PlacementTestTypes.MultipleChoiceQuestion>
  >;
  answer: PlacementTestTypes.Answer;
  setAnswer: React.Dispatch<React.SetStateAction<PlacementTestTypes.Answer>>;
}) => {
  const DEFAULT_OPTIONS_NUMBER = 4;
  const defaultOptions = question.choices || [];

  if (!defaultOptions.length) {
    for (let i = 0; i < DEFAULT_OPTIONS_NUMBER; i++) {
      defaultOptions.push(blankMultipleChoiceQuestionChoice);
    }
    setQuestion({ ...question, choices: defaultOptions });
  }

  const addOption = () => {
    const choices = [...question.choices];
    choices.push(blankMultipleChoiceQuestionChoice);
    setQuestion({ ...question, choices });
  };

  const ChoiceDisplay = ({
    choice,
    index,
  }: {
    choice: PlacementTestTypes.MultipleChoiceQuestionChoice;
    index: number;
  }) => {
    const _isCorrect = answer.answerIndexes.includes(index);
    const [thisChoice, setThisChoice] = useState(choice);
    const [isCorrect, setIsCorrect] = useState(_isCorrect);
    const debounced = useCallback(
      debounce((newChoice) => {
        console.log(index);
        console.log(newChoice, question.choices);
        const choices = question.choices.map((c, i) => {
          console.log(c, i);
          if (i === index) return newChoice;
          return c;
        });
        console.log(choices);
        setQuestion({ ...question, choices });
      }, 1000),
      []
    );

    const handleCheckboxClick = () => {
      const correct = !isCorrect;
      setIsCorrect(correct);
      if (correct) {
        const updatedAnswerIndexes = answer.answerIndexes.concat(index);
        setAnswer({ ...answer, answerIndexes: updatedAnswerIndexes });
      } else {
        const updatedAnswerIndexes = answer.answerIndexes.filter(
          (e) => e !== index
        );
        setAnswer({ ...answer, answerIndexes: updatedAnswerIndexes });
      }
    };

    const removeOption = () => {
      const updatedOptions = question.choices.filter((_, i) => i !== index);
      setQuestion({ ...question, choices: updatedOptions });

      // update answers because indexes have changed
      const updatedAnswerIndexes = answer.answerIndexes
        .map((answerIndex) => {
          if (answerIndex > index) {
            return answerIndex - 1;
          } else if (answerIndex === index) {
            return null;
          } else {
            return answerIndex;
          }
        })
        .filter((e) => e !== null);
      setAnswer({ ...answer, answerIndexes: updatedAnswerIndexes });
    };

    return (
      <TableRow>
        <TableCell>
          <Checkbox
            checked={isCorrect}
            onChange={handleCheckboxClick}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </TableCell>
        <TableCell>
          <TextField
            value={thisChoice.displayValue}
            onChange={(e) => {
              const newChoice = {
                ...thisChoice,
                displayValue: e.target.value,
              };
              setThisChoice(newChoice);
              debounced(newChoice);
            }}
          />
        </TableCell>
        <TableCell>
          <IconButton
            color="primary"
            aria-label="add question answer choice"
            onClick={removeOption}
          >
            <RemoveCircleOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };
  return (
    <Grid item container alignItems="center" xs={12}>
      <Grid item>
        <IconButton
          color="primary"
          aria-label="add question answer choice"
          onClick={addOption}
        >
          <AddCircle />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography>Add Choice</Typography>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Is Correct?</TableCell>
            <TableCell>Answer Text</TableCell>
            <TableCell>Remove Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {question.choices.map((choice, i) => (
            <ChoiceDisplay key={i} choice={choice} index={i} />
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

const blankQuestion: PlacementTestTypes.Question = {
  _id: "",
  questionText: "",
  type: "multiple-choice",
};
const blankAnswer: PlacementTestTypes.Answer = {
  answerIndexes: [],
  answers: [],
  questionId: "",
};

const PlacementTest = (props: { test: PlacementTestTypes.Test }) => {
  console.log(props);
  const router = useRouter();
  const classes = useStyles();

  const [question, setQuestion] = useState<
    PlacementTestTypes.Question | PlacementTestTypes.MultipleChoiceQuestion
  >(blankQuestion);
  const [answer, setAnswer] = useState<PlacementTestTypes.Answer>(blankAnswer);

  const displayForm = () => {
    switch (question.type) {
      case "multiple-choice":
        const multipleChoiceQuestion: PlacementTestTypes.MultipleChoiceQuestion =
          {
            choices: [],
            ...question,
            type: "multiple-choice",
            answer: { answerIndexes: [], answers: [] },
          };

        return (
          <MultipleChoiceQuestionForm
            question={multipleChoiceQuestion}
            setQuestion={setQuestion}
            answer={answer}
            setAnswer={setAnswer}
          />
        );
      default:
        return null;
    }
  };

  const commitQuestion = () => {
    switch (question.type) {
      case "multiple-choice":
        const multipleChoiceQuestion =
          question as PlacementTestTypes.MultipleChoiceQuestion;
        // Fill in answer text for answers
        const answerTexts = multipleChoiceQuestion.choices.filter((_, i) =>
          answer.answerIndexes.includes(i)
        );
        const updatedAnswer = { ...answer, answerTexts };
        multipleChoiceQuestion.answer = updatedAnswer;

        const url = multipleChoiceQuestion._id
          ? `/api/placementTests/${props.test._id}/${multipleChoiceQuestion._id}`
          : `/api/placementTests/${props.test._id}`;
        const method = multipleChoiceQuestion._id ? "PUT" : "POST";
        fetch(url, {
          body: JSON.stringify(multipleChoiceQuestion),
          method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((res) => {
          console.log(res);
          if (res.ok) {
          } else {
          }
        });
        return;
      default:
        return;
    }
  };

  return (
    <Layout showNav={false} title="test">
      <Container>
        <Grid container justify="center">
          <Grid item>
            <Typography component="h2" variant="h4">
              {props.test.name}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm">
        <Grid
          container
          className={classes.questionForm}
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6}>
            <Typography component="h3" variant="h6">
              Add Question
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Select
              labelId="question-type-select-label"
              id="question-type-select"
              value={question.type}
              label="Question Type"
              onChange={(e) =>
                setQuestion({ ...question, type: e.target.value })
              }
            >
              {TEST_CONFIG.questionTypes.map((type, i) => (
                <MenuItem key={i} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select Question Type</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={question.questionText}
              multiline
              label="Write your question here"
              fullWidth
              onChange={(e) =>
                setQuestion({ ...question, questionText: e.target.value })
              }
            />
          </Grid>
        </Grid>
        {displayForm()}
        <Grid
          container
          className={classes.questionForm}
          alignItems="center"
          justify="center"
          spacing={2}
        >
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={commitQuestion}
            >
              Add To Test
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm">
        <Grid container alignItems="center">
          <List type="questions" items={props.test.questions} />
        </Grid>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  await dbConnect();
  const tests = await PlacementTestModel.find({});
  const paths = tests.map((test) => ({
    params: { id: test._id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const placementTestId = params?.id;
    const result = await PlacementTestModel.findById(placementTestId)
      .populate({ path: "questions" })
      .lean()
      .exec();

    const test = {
      ...result,
      _id: result._id.toString(),
      questions: result.questions.map((q) => ({ ...q, _id: q._id.toString() })),
    };

    console.log(test);
    return {
      props: { test },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

export default PlacementTest;
