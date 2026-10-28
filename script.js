document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const inputText = document.getElementById('text-input');
    const avatarContainer = document.getElementById('avatar-container');
    const translateBtn = document.getElementById('translate-btn');
    const voiceBtn = document.getElementById('voice-btn');

    // Existing avatar mapping
    const letterToAvatar = {
        a: 'avatars/a.gif',
        b: 'avatars/b.gif',
        c: 'avatars/c.gif',
        d: 'avatars/d.gif',
        e: 'avatars/e.gif',
        f: 'avatars/f.gif',
        g: 'avatars/g.gif',
        h: 'avatars/h.gif',
        i: 'avatars/i.gif',
        j: 'avatars/j.gif',
        k: 'avatars/k.gif',
        l: 'avatars/l.gif',
        m: 'avatars/m.gif',
        n: 'avatars/n.gif',
        o: 'avatars/o.gif',
        p: 'avatars/p.gif',
        q: 'avatars/q.gif',
        r: 'avatars/r.gif',
        s: 'avatars/s.gif',
        t: 'avatars/t.gif',
        u: 'avatars/u.gif',
        v: 'avatars/v.gif',
        w: 'avatars/w.gif',
        x: 'avatars/x.gif',
        y: 'avatars/y.gif',
        z: 'avatars/z.gif',

        0: 'avatars/0.gif',
        1: 'avatars/1.gif',
        2: 'avatars/2.gif',
        3: 'avatars/3.gif',
        4: 'avatars/4.gif',
        5: 'avatars/5.gif',
        6: 'avatars/6.gif',
        7: 'avatars/7.gif',
        8: 'avatars/8.gif',
        9: 'avatars/9.gif',

        default: 'avatars/default.png'
    };

    // Translate text into avatar rows
    const translateText = (text) => {

        if (!text || !text.trim()) {
            alert('Please type or speak some text to translate!');
            return;
        }

        // Clear previous results
        avatarContainer.innerHTML = '';

        // Split the sentence into words
        const words = text.trim().split(/\s+/);

        // Create a separate row for every word
        words.forEach((word) => {

            const wordRow = document.createElement('div');
            wordRow.className = 'avatar-row';

            // Display each letter's GIF within its word row
            [...word].forEach((letter) => {

                const img = document.createElement('img');

                const imagePath =
                    letterToAvatar[letter.toLowerCase()] ||
                    letterToAvatar.default;

                img.src = imagePath;
                img.alt = `Sign gesture for ${letter}`;

                // Use the default image if an avatar fails to load
                img.onerror = function () {
                    this.onerror = null;
                    this.src = letterToAvatar.default;
                };

                wordRow.appendChild(img);
            });

            // Append the entire word row
            avatarContainer.appendChild(wordRow);
        });

        // Scroll to the results without removing existing rows
        avatarContainer.scrollTo({
            top: avatarContainer.scrollHeight,
            behavior: 'smooth'
        });
    };

    // Translate button
    translateBtn.addEventListener('click', () => {
        translateText(inputText.value);
    });

    // Voice input support
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    let recognition = null;

    if (SpeechRecognition) {

        recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.lang = 'en-US';

        // Start voice recognition
        voiceBtn.addEventListener('click', () => {
            try {
                recognition.start();
            } catch (error) {
                alert('Voice recognition is already running. Please try again.');
            }
        });

        // Process recognized speech
        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;

            inputText.value = result;

            translateText(result);
        };

        // Handle recognition errors
        recognition.onerror = (event) => {
            if (event.error === 'not-allowed') {
                alert('Please allow microphone access to use voice input.');
            } else {
                alert('Voice recognition failed. Please try again.');
            }
        };

    } else {

        // Avoid crashing in browsers without speech recognition
        voiceBtn.addEventListener('click', () => {
            alert('Voice recognition is not supported in this browser.');
        });

    }

});