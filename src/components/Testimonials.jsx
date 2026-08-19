const reviews = [
  {
    name: 'Priya S.',
    rating: 5,
    text: 'The Greek salad was incredible and booking a table online took less than a minute.',
  },
  {
    name: 'Marcus T.',
    rating: 5,
    text: 'Warm service, generous portions, and the lemon dessert is worth the trip on its own.',
  },
  {
    name: 'Elena R.',
    rating: 4,
    text: 'A cozy neighborhood spot. We reserved for an anniversary and everything felt special.',
  },
]

export default function Testimonials() {
  return (
    <section className="section testimonials" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="reviews-heading">Testimonials</h2>
        </div>
        <div className="cards">
          {reviews.map((review) => (
            <blockquote className="quote" key={review.name}>
              <p className="stars" aria-label={`${review.rating} out of 5 stars`}>
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </p>
              <p>{review.text}</p>
              <footer>{review.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
