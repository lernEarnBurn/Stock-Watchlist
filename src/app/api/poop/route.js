export async function GET() {
  const data = {
    users: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ],
  };

  // Return the data as a JSON response
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
