const params = new URLSearchParams(window.location.search);
const rawText = params.get('text');

if (rawText) {
    const formatted = parseFormattedText(rawText);
    document.getElementById('codeBlock').innerHTML = formatted;
} else {
    document.getElementById('codeBlock').textContent = "Errore";
}

function copyCode() {
    const code = document.getElementById("codeBlock").textContent;

    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = "Copiato!";
        setTimeout(() => btn.innerHTML = "<i class='fa-solid fa-copy'></i> Copia", 2000);
    });
}

function shareText() {
    const text = document.getElementById("codeBlock").textContent;

    if (navigator.share) {
        navigator.share({
            title: 'Condividi contenuto',
            text: text,
        }).then(() => {
            console.log('Condiviso con successo!');
        }).catch((err) => {
            console.error('Errore nella condivisione:', err);
        });
    } else {
        alert("La condivisione non è supportata su questo dispositivo.");
    }
}

function parseFormattedText(raw) {
  let text = decodeURIComponent(raw);

  // Sostituzioni base
  text = text.replaceAll('__', '\n').replaceAll('_', ' ');

  // Ordine: grassetto → corsivo → sottolineato → titolo
  text = text.replace(/\*(.+?)\*/g, '<strong>$1</strong>');
  text = text.replace(/-(.+?)-/g, '<em>$1</em>');
  text = text.replace(/\$(.+?)\$/g, '<u>$1</u>');
  text = text.replace(/#(.+?)#/g, '<span class="custom-title">$1</span>');

  // A capo visivo
  text = text.replace(/\n/g, '<br>');

  return text;
}
