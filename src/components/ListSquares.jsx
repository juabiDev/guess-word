export function ListSquares({ guessWord }) {
    return (
        <section style={{ display: "flex", justifyContent: "center"}}>
        {
          guessWord.map(element => {
            const id = crypto.randomUUID()
            return (
              <input key={id} placeholder={element} 
              style={{ width: "25px", 
                      textAlign: "center",
                    }} 
              type='text' disabled/>
            )
          })
        }
      </section>
    )
}