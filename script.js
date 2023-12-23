var numerosSorteados = [];
        var cartelaNumeros = criarCartela();

        function sortearNumero() {
            iniciarSuspenseMusica();

            var numeroSorteado;

            do {
                numeroSorteado = Math.floor(Math.random() * 60) + 1;
            } while (numerosSorteados.includes(numeroSorteado) && numerosSorteados.length < 60);

            if (numerosSorteados.length >= 60) {
                alert("Todos os números foram sorteados. Reinicie o sorteio.");
                return;
            }

            var roleta = document.getElementById('roleta');
            roleta.innerHTML = '';

            var contagemRegressiva = 5;
            var contagemRegressivaInterval = setInterval(function () {
                roleta.innerHTML = contagemRegressiva;
                contagemRegressiva--;

                if (contagemRegressiva < 0) {
                    clearInterval(contagemRegressivaInterval);
                    roleta.innerHTML = numeroSorteado;
                    roleta.classList.add('bingo-animation');
                    marcarNaCartela(numeroSorteado);

                    setTimeout(function () {
                        roleta.classList.remove('bingo-animation');
                        pararSuspenseMusica();
                    }, 2000);
                }
            }, 1000);
        }

        function desempate() {
            iniciarSuspenseMusica();

            if (numerosSorteados.length === 0) {
                alert("Nenhum número foi sorteado ainda.");
                return;
            }

            var numerosSorteadosMarcados = numerosSorteados.filter(numero => cartelaNumeros.includes(numero) && !numerosSorteadosDesempate.includes(numero));
            if (numerosSorteadosMarcados.length === 0) {
                alert("Nenhum número sorteado está marcado na tabela para desempate.");
                return;
            }

            var numeroDesempatado = numerosSorteadosMarcados[Math.floor(Math.random() * numerosSorteadosMarcados.length)];
            numerosSorteadosDesempate.push(numeroDesempatado);

            var roleta = document.getElementById('roleta');
            roleta.innerHTML = '';

            var contagemRegressiva = 5;
            var contagemRegressivaInterval = setInterval(function () {
                roleta.innerHTML = contagemRegressiva;
                contagemRegressiva--;

                if (contagemRegressiva < 0) {
                    clearInterval(contagemRegressivaInterval);
                    roleta.innerHTML = numeroDesempatado;
                    roleta.classList.add('bingo-animation', 'desempate');
                    marcarNaCartelaDesempate(numeroDesempatado);

                    setTimeout(function () {
                        roleta.classList.remove('bingo-animation', 'desempate');
                        pararSuspenseMusica();
                    }, 2000);
                }
            }, 1000);
        }

        function marcarNaCartela(numero) {
            numerosSorteados.push(numero);
            atualizarCartela();
        }

        function criarCartela() {
            var cartela = [];
            for (var i = 1; i <= 60; i++) {
                cartela.push(i);
            }
            return cartela;
        }

        function atualizarCartela() {
            var cartelaElement = document.getElementById("cartela");
            cartelaElement.innerHTML = "";

            for (var i = 1; i <= 60; i++) {
                var quadrado = document.createElement("div");
                quadrado.textContent = i;

                if (numerosSorteados.includes(i)) {
                    quadrado.classList.add("quadrado", "sorteado");
                } else {
                    quadrado.classList.add("quadrado");
                }

                cartelaElement.appendChild(quadrado);
            }
        }

        function marcarNaCartelaDesempate(numero) {
            var quadrado = document.querySelector('.quadrado:nth-child(' + numero + ')');
            quadrado.classList.remove('sorteado');
            quadrado.classList.add('desempate');
        }

        function reiniciarSorteio() {
            var confirmacao = confirm("Deseja realmente reiniciar o sorteio?");

            if (confirmacao) {
                numerosSorteados = [];
                cartelaNumeros = criarCartela();
                atualizarCartela();
            }
        }

        function iniciarSuspenseMusica() {
            var suspenseAudio = document.getElementById('suspenseAudio');
            suspenseAudio.play();
        }

        function pararSuspenseMusica() {
            var suspenseAudio = document.getElementById('suspenseAudio');
            suspenseAudio.pause();
            suspenseAudio.currentTime = 0;
        }

        window.onload = function () {
            atualizarCartela();
        };

        var numerosSorteadosDesempate = [];