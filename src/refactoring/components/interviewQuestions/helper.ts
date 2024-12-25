export const formatCreateInterviewPreparation = async (formData: any) => {
  const { tags } = formData;
  formData.questions.forEach((question: any) => {
    question.promptBy = parseInt(question.promptBy);
  });

  const formattedData = {
    type: "DIRECT",
    ...formData,
    tags: tags?.map((tag: any) => tag.text),
  };
  return formattedData;
};

export const formatCreateInterviewQuestion = async (
  formData: any,
  selectedQuestion: any
) => {
  const { tags } = formData;
  formData.questions.forEach((question: any) => {
    question.promptBy = parseInt(question.promptBy);
  });
  const formattedData = {
    type: "INTERVIEW",
    submissionID: selectedQuestion?.submission_id,
    interviewID: selectedQuestion?._id,
    ...formData,
    tags: tags?.map((tag: any) => tag.text),
  };
  return formattedData;
};

export const formatUpdateInterviewPreparation = async (formData: any, previousQuestions: any) => {
  const { questions } = formData;

  // Calculate the maximum ID from previous questions
  var maxId = previousQuestions.reduce((max: number, pq: any) => Math.max(max, pq.id), 0);

  formData.questions.forEach((question: any) => {
    const previousQuestion = previousQuestions.find((pq: any) => pq.id === question.id);
    
    // If the previous question does not exist, assign a new unique ID
    if (!previousQuestion) {
      question.id = maxId + 1; // Assign a new unique ID
      maxId++; // Increment maxId for the next new question
    }

    question.text = question.text;
    question.promptBy = parseInt(question.promptBy);

    // Update logic for updateRequired
    question.updateRequired =
      question?.text !== previousQuestion?.text || question?.promptBy !== previousQuestion?.promptBy;
  });

  const formattedData = {
    type: "DIRECT",
    client: formData?.client,
    difficultyLevel: formData?.difficultyLevel,
    notes: formData?.notes,
    position: formData?.position,
    questions: questions,
    round: formData?.round,
    tags: formData.tags?.map((tag: any) => tag.text),
    vendor: formData?.vendor,
  };

  return formattedData;
};

export const formatUpdateInterviewQuestion = async (
  formData: any,
  selectedQuestion: any,
  previousQuestions: any,
) => {
  const { tags, questions } = formData;

  // Calculate the maximum ID from previous questions
  var maxId = previousQuestions.reduce((max: number, pq: any) => Math.max(max, pq.id), 0);

  formData.questions.forEach((question: any) => {
    const previousQuestion = previousQuestions.find((pq: any) => pq.id === question.id);
    
    // If the previous question does not exist, assign a new unique ID
    if (!previousQuestion) {
      question.id = maxId + 1; // Assign a new unique ID
      maxId++; // Increment maxId for the next new question
    }

    question.text = question.text;
    question.promptBy = parseInt(question.promptBy);

    // Update logic for updateRequired
    question.updateRequired =
      question?.text !== previousQuestion?.text || question?.promptBy !== previousQuestion?.promptBy;
  });

  const formattedData = {
    type: "INTERVIEW",
    submissionID: selectedQuestion?.submission_id,
    interviewID: selectedQuestion?._id,
    client: selectedQuestion?.subDetails.client.name,
    difficultyLevel: formData?.difficultyLevel,
    notes: formData?.notes,
    position: selectedQuestion.subDetails.jobRole,
    questions: questions,
    round: selectedQuestion.status,
    tags: tags?.map((tag: any) => tag.text),
    vendor: selectedQuestion?.subDetails.client.name,
  };

  return formattedData;
};



