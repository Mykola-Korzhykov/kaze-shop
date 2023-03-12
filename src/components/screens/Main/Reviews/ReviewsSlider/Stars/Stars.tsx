const Stars = (): JSX.Element => {
    return (
        <div>
            {[...new Array(5)].map((item, i) => {
                return (
                    <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M15.399 8.2408L12 1L8.601 8.2408L1 9.40904L6.5 15.0421L5.202 23L12 19.2408L15.399 8.2408Z" fill="#fff" />
                        <path d="M15.399 8.2408L12 1L8.601 8.2408L1 9.40904L6.5 15.0421L5.202 23L12 19.2408M15.399 8.2408L23 9.40904L17.5 15.0421L18.798 23L12 19.2408M15.399 8.2408L12 19.2408" stroke="#0B0B0B" strokeWidth="1.375" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            })}
        </div>
    )
}

export default Stars;