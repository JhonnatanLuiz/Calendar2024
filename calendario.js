// Obtém o elemento onde o calendário será renderizado
const calendarioElement = document.getElementById('calendario');

// Funcão para criar umm calendário simples para um ano especifíco
function criarCalendario(ano) {
    // Array com os nomes dos meses e a quantidade de dias em cada mês
    const meses = [
        {nome: "Janeiro", dias: 31, primeiroDia: 2 },
        {nome: "Fevereiro", dias: 29, primeiroDia: 5 }, //Ano bissexto
        {nome: "Março", dias: 31, primeiroDia: 6 },
        {nome: "Abril", dias: 30, primeiroDia: 2 },
        {nome: "Maio", dias: 31, primeiroDia: 4 },
        {nome: "Junho", dias: 30, primeiroDia: 7 },
        {nome: "Julho", dias: 31, primeiroDia: 2 },
        {nome: "Agosto", dias: 31, primeiroDia: 5 },
        {nome: "Setembro", dias: 30, primeiroDia: 1 },
        {nome: "Outubro", dias: 31, primeiroDia: 3 },
        {nome: "Novembro", dias: 30, primeiroDia: 6 },
        {nome: "Dezembro", dias: 31, primeiroDia: 1 }
    ];

    //Array com os nomes dos dias da semana
    const diasDaSemana = ["Dom", "Seg", "Ter", "Quar", "Qui", "Sex", "Sab"];

    //Feriados nacionais
    const feriadosNacionais = [
        {mes: "Janeiro", dia: 1, nome: "Confraternização Universal"},
        {mes: "Março", dia: 29, nome: "Sexta-feira Santa"},
        {mes: "Abril", dia: 21, nome: "Tiradentes"},
        {mes: "Maio", dia: 1, nome: "Dia do Trabalhador"},
        {mes: "Setembro", dia: 7, nome: "Independência do Brasil"},
        {mes: "Outubro", dia: 12, nome: "Dia das Crianças"},
        {mes: "Novembro", dia: 2, nome: "Finados"},
        {mes:"Novembro", dia: 15, nome: "Proclamação da República" },
        {mes: "Dezembro", dia: 25, nome: "Natal"}
    ]; // Dia do mês de cada feriado

    //Datas comemorativas
    const datasComemorativas = [
        {mes: "Fevereiro", dia: 13, nome: "Carnaval"},
        {mes: "Março", dia: 8, nome: "Dia da Mulher"},
        {mes: "Março", dia: 31, nome: "Páscoa"},
        {mes: "Abril", dia: 19, nome: "Dia do Índio"},
        {mes: "Abril", dia: 22, nome: "Descobrimento do Brasil"},
        {mes: "Maio", dia: 12, nome: "Dia das Mães"},
        {mes: "Maio", dia: 13, nome: "Abolição da Escravatura"},
        {mes: "Maio", dia: 30, nome: "Corpus Christi"},
        {mes: "Junho", dia: 5, nome: "Dia Mundial do Meio Ambiente"},
        {mes: "Junho", dia: 12, nome: "Dia dos Namorados"},
        {mes: "Junho", dia: 24, nome: "Dia de São João"},
        {mes: "Junho", dia: 29, nome: "Dia de São Pedro"},
        {mes: "Julho", dia: 20, nome: "Dia do Amigo e Internacional da Amizade"},
        {mes: "Agosto", dia: 11, nome: "Dia dos Pais"},
        {mes: "Outubro", dia: 15, nome: "Dia do Professor"},
        {mes: "Novembro", dia: 20, nome: "Dia Nacional da Consciência Negra"}
    ]; //Dia do mês de cada data comemorativa

    //Adiciona o ano acima do calendário
    const anoElement = document.createElement('h1');
    anoElement.textContent = ano.toString();
    calendarioElement.appendChild(anoElement);

    // Loop pelos meses
    meses.forEach((mes, indice) => {
        // Cria um elemento para o mês
        const monthElement = document.createElement('div');
        monthElement.classList.add('month');
        monthElement.innerHTML = `<h2>${mes.nome}</h2>`;

        //Adiciona os dias da semana
        const diasDaSemanaElement = document.createElement('div');
        diasDaSemana.forEach(dia => {
            const diaDaSemanaSpan = document.createElement('span');
            diaDaSemanaSpan.textContent = dia;
            diasDaSemanaElement.appendChild(diaDaSemanaSpan);
        });
        diasDaSemanaElement.classList.add('dias-semana'); //Adiciona uma classe para estilização
        monthElement.appendChild(diasDaSemanaElement);

        //Encontra o dia a semana do primeiro dia do mês
        let diaDaSemanaInicio = mes.primeiroDia; // O (Dom) a 6 (Sab)

        //Ajusta para que Domingo (0) seja 7 e a semana comece de Segunda-feira (1) a Domingo (7)
        diaDaSemanaInicio = (diaDaSemanaInicio === 0) ? 7 : diaDaSemanaInicio;

        // Adiciona os dias do mês
        const diasMesElement = document.createElement('div');
        diasMesElement.classList.add('dias-mes') // Adiciona uma classe para estilização  
        let diasNaSemana = 0;

        //Adiciona espaços para alinhar com o dia da semana correto
        for (let i = 1; i < diaDaSemanaInicio; i++) {
            const espacoVazio = document.createElement('div');
            espacoVazio.classList.add('day');
            diasMesElement.appendChild(espacoVazio);
            diasNaSemana++;
        }
         
        //Loop pelos dias do mês
        for(let dia = 1; dia <= mes.dias; dia++) {
            // Cria um elemento para o dia
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');

            //Verifica se o dia é um feriado nacional
            const isFeriado = feriadosNacionais.some(feriado => feriado.dia === dia &&
                feriado.mes === mes.nome);

            //Verifica se o dia é uma data comemorativa
            const isDataComemorativa = datasComemorativas.some(data => data.dia === dia && 
                data.mes === mes.nome);

            // Adiciona a classe 'feriado' aos dias que são feriados nacionais
            if (isFeriado) {
                dayElement.classList.add('feriado');
            }

            // Adiciona a classe 'data-comemorativa' aos dias que são datas comemorativas
            if (isDataComemorativa) {
                dayElement.classList.add('data-comemorativa');
            }
            

            // Adiciona o número do dia em negrito se for feriado ou data comemorativa
            if (isFeriado || isDataComemorativa) {
            const numeroDiaElement = document.createElement('strong');
            numeroDiaElement.textContent = `${dia}`;
            dayElement.appendChild(numeroDiaElement);
         } else {
                dayElement.textContent = `${dia}`;
            }

            // Adiciona o dia ao mês
            diasMesElement.appendChild(dayElement);
            

            //Verifica se é o último da semana
            if (++diasNaSemana === 7) {
                diasNaSemana = 0;
            }
        }

        // adiciona os dias do mês ao calendário
        monthElement.appendChild(diasMesElement);

        // Adiciona os nomes dos feriados e datas comemorativas abaixo do mês
        const feriadosDoMes = feriadosNacionais.filter(feriado => feriado.mes === mes.nome);
        const datasComemorativasdoMes = datasComemorativas.filter(data => data.mes === mes.nome);
        const eventosDoMes = [...feriadosDoMes, ...datasComemorativasdoMes];
        eventosDoMes.forEach(evento => {
            const eventoElement = document.createElement('p');
            eventoElement.innerHTML = `<strong>${evento.dia} de ${mes.nome} - ${evento.nome}
            </strong>`;
                        monthElement.appendChild(eventoElement);
        });

            calendarioElement.appendChild(monthElement);
        });
    }

    // Chama a função para criar o calendário para o ano 2024
    criarCalendario(2024);