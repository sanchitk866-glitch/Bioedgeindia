export default function handler(req, res) {
  const posts = [
    {
      title: "AI helps discover new drug molecules",
      category: "AI in Biology",
      summary: "Researchers are using artificial intelligence to predict drug interactions faster."
    },
    {
      title: "Biotech internship at IISc",
      category: "Internships",
      summary: "IISc Bangalore announced summer internships for biology students."
    }
  ];

  res.status(200).json(posts);
}
