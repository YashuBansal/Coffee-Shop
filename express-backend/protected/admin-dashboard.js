function exportToExcel() {
  const table = document.getElementById("messageTable");

  // Clone the table and remove the "Delete" column
  const clone = table.cloneNode(true);
  const rows = clone.querySelectorAll("tr");
  rows.forEach((row) => row.deleteCell(-1)); // Removes last cell in each row

  const workbook = XLSX.utils.table_to_book(clone, { sheet: "Messages" });
  XLSX.writeFile(workbook, "contact-messages.xlsx");
}

async function loadMessages() {
  const res = await fetch("/messages");
  const data = await res.json();

  const tbody = document.querySelector("#messageTable tbody");
  tbody.innerHTML = "";

  data.forEach((msg) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${msg.name}</td>
          <td>${msg.email}</td>
          <td>${msg.message}</td>
          <td>${new Date(msg.createdAt).toLocaleString()}</td>
          <td><button onclick="deleteMessage('${msg._id}')">Delete</button></td>
        `;
    tbody.appendChild(row);
  });
}

async function deleteMessage(id) {
  if (confirm("Are you sure you want to delete this message?")) {
    const res = await fetch(`/messages/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      alert("Message deleted");
      loadMessages(); // Refresh
    } else {
      alert("Delete failed");
    }
  }
}

loadMessages();
