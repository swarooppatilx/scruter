import { getAnsweredQuestions, getUnansweredQuestions } from "@/actions/forum/Question";


const Forum = async () => {
  // Fetch unanswered and answered questions using server actions
  const unansweredResp = await getUnansweredQuestions();
  const answeredResp = await getAnsweredQuestions();

  // Conditional rendering based on the responses
  return (
    <div>
      <h1>Forum</h1>

      {/* Unanswered Questions Section */}
      <h2>Unanswered Questions</h2>
      {unansweredResp.success ? (
        <div>
          {unansweredResp.data?.map((question) => (
            <form key={question.id}>
              <div>
                <label htmlFor={`answer-${question.id}`}>Answer Question:</label>
                <textarea id={`answer-${question.id}`} name={`answer-${question.id}`} required></textarea>
              </div>
              <button type="submit">Submit Answer</button>
            </form>
          ))}
        </div>
      ) : (
        <p>No unanswered questions available.</p>
      )}

      {/* Answered Questions Section */}
      <h2>Answered Questions</h2>
      {answeredResp.success ? (
        <div>
          {answeredResp.data?.map((question) => (
            <div key={question.id}>
              <p><strong>Question:</strong> {question.content}</p>
              <p><strong>Answers:</strong></p>
              {question.answers?.map((answer) => (
                <p key={answer.id}>{answer.content}</p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No answered questions available.</p>
      )}
    </div>
  );
}

export default Forum;
