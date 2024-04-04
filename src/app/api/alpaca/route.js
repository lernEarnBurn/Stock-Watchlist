const Alpaca = require('@alpacahq/alpaca-trade-api');

let alpaca;
let socket;
let clients = [];

export async function POST(req) {
  const { action, symbols } = await req.json();

  if (action === "connect") {
    alpaca = new Alpaca({
      keyId: process.env.ALPACA_API_KEY,
      secretKey: process.env.ALPACA_SECRET,
      feed: "sip",
      paper: true,
    });

    socket = alpaca.data_stream_v2;

    socket.onConnect(function () {
      console.log("Connected");
      socket.subscribeForQuotes(symbols);
    });

    socket.onError((err) => {
      console.log(err);
    });

    socket.onStockQuote((quote) => {
      console.log("Quote:", quote);
      clients.forEach((client) => {
        client.write(`data: ${JSON.stringify(quote)}\n\n`);
      });
    });

    socket.onStateChange((state) => {
      console.log("State:", state);
    });

    socket.onDisconnect(() => {
      console.log("Disconnected");
    });

    socket.connect();

    const { readable, writable } = new TransformStream();
    clients.push(writable);

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
      },
    });
  } else if (action === "disconnect") {
    socket.disconnect();

    return new Response(JSON.stringify({ message: "WebSocket disconnected" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new Response(JSON.stringify({ message: "Invalid action" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}