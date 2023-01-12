import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
`

const LearnExerciseIcon = ({ focus }: any) => {
  console.log(focus)
  return (
    <Container>
      <svg
        width="22"
        height="22"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6821 3.33865H13.6818C12.7976 3.33865 11.9497 3.68986 11.3246 4.31503C10.6994 4.9402 10.3482 5.78811 10.3482 6.67223V18.3398C10.3482 17.6767 10.6116 17.0408 11.0805 16.5719C11.5493 16.103 12.1853 15.8396 12.8484 15.8396H18.6821V3.33865Z"
          stroke="#000"
          strokeWidth="1.66678"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.01448 3.33865H7.01486C7.89898 3.33865 8.74689 3.68986 9.37206 4.31503C9.99723 4.9402 10.3484 5.78811 10.3484 6.67223V18.3398C10.3484 17.6767 10.085 17.0408 9.61616 16.5719C9.14728 16.103 8.51135 15.8396 7.84826 15.8396H2.01448V3.33865Z"
          stroke="#000"
          strokeWidth="1.66678"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Container>
  )
}

export default LearnExerciseIcon
