async function toggleBot() {
  const response = await fetch("/api/toggle", {
    method: "POST"
  });

  const data = await response.json();
  alert(`Bot status: ${data.status}`);
}
