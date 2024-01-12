import { ALL_LETTERS } from "../../constants"

export function ListLetters({ onChange }) {

    return (
        <section>
        {ALL_LETTERS.map((y, x) => (
          y.map(letter => (
            <button key={letter} onClick={() => {
                onChange(letter)
            }}>{letter}</button>
          ))
        ))}
      </section>
    )
}