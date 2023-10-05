import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  questions:string[] =[

    '1. Puedo recordar algo mejor si lo escribo',
    '2. Al leer, oigo las palabras en mi cabeza o leo en voz alta',
    '3. Necesito hablar las cosas para entenderlas mejor',
    '4. No me gusta leer o escuchar instrucciones, prefiero simplemente comenzar a hacer las cosas',
    '5. Puedo visualizar imágenes en mi cabeza',
    '6. Puedo estudiar mejor si escucho música',
    '7. Necesito recreos frecuentes cuando estudio',
    '8. Pienso mejor cuando tengo la libertad de moverme, estar sentado detrás de un escritorio no es para mí',
    '9. Tomo muchas notas de lo que leo y escucho.',
    '10. Me ayuda MIRAR a la persona que está hablando. Me mantiene enfocado.',
    '11. se me hace difícil entender lo que una persona está diciendo si hay ruidos alrededor.',
    '12. Prefiero que alguien me diga cómo tengo que hacer las cosas que leer las instrucciones.',
    '13. Prefiero escuchar una conferencia o una grabación a leer un libro.',
    '14. Cuando no puedo pensar en una palabra específica, uso mis manos y llamo al objeto “coso”.',
    '15. Puedo seguir fácilmente a una persona que está hablando aunque mi cabeza esté hacia abajo o me encuentre mirando por una ventana.',
    '16. Es más fácil para mí hacer un trabajo en un lugar tranquilo.',
    '17. Me resulta fácil entender mapas, tablas y gráficos.',
    '18. Cuando comienzo un artículo o un libro, prefiero espiar la última página.',
    '19. Recuerdo mejor lo que la gente dice que su aspecto.',
    '20. Recuerdo mejor si estudio en voz alta con alguien.',
    '21. Tomo notas, pero nunca vuelvo a releerlas.',
    '22. Cuando estoy concentrado leyendo o escribiendo, la radio me molesta.',
    '23. Me resulta difícil crear imágenes en mi cabeza.',
    '24. Me resulta útil decir en voz alta las tareas que tengo para hacer.',
    '25. Mi cuaderno y mi escritorio pueden verse un desastre, pero sé exactamente dónde está cada cosa.',
    '26. Cuando estoy en un examen, puedo “ver” la página en el libro de textos y la respuesta.',
    '27. No puedo recordar una broma lo suficiente para contarla luego.',
    '28. Al aprender algo nuevo, prefiero escuchar la información, luego leer y luego hacerlo.',
    '29. Me gusta completar una tarea antes de comenzar otra.',
    '30. Uso mis dedos para contar y muevo los labios cuando leo.',
    '31. No me gusta releer mi trabajo.',
    '32. Cuando estoy tratando de recordar algo nuevo, por ejemplo, un número de teléfono, me ayuda formarme una imagen mental para lograrlo.',
    '33. Para obtener una nota extra, prefiero grabar un informe a escribirlo.',
    '34. Fantaseo en clase',
    '35. Para obtener una calificación extra, prefiero crear un proyecto a escribir un informe.',
    '36. Cuando tengo una gran idea, debo escribirla inmediatamente, o la olvido con facilidad.',

  ];


  options:string[]=[

    "Casi nunca",
    "Rara vez",
    "A veces",
    "Frecuentemente",
    "Casi siempre",

  ];

  //Inizializa con ceros segun la cantidad de preguntas
  selections:number[]=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];



  calculateSum(){


    //Verificar que no falten respuestas

    if (this.selections.includes(0)) {
      
      // Al menos una respuesta 
      Swal.fire({
        icon:'error',
        title:'ERROR',
        text: 'Por favor complete todas las respuestas antes de continuar.',
        confirmButtonText:'OK'
      })

    }else{

    // Guardar las selecciones en el localStorage
    localStorage.setItem('questionnaireSelections',JSON.stringify(this.selections));

    //Obtener los datos del localstorage

    const resultadoStr = localStorage.getItem('questionnaireSelections');

    if (resultadoStr !== null) {

      const resultados = JSON.parse(resultadoStr);

      //Inisializa tres arrays para las sumas 

        const visual = [1, 5, 9, 10, 11, 16, 17, 22, 26, 27, 32, 36];
        const auditivo = [2, 3, 12, 13, 15, 19, 20, 23, 24, 28, 29, 33];
        const kinestesico = [4, 6, 7, 8, 14, 18, 21, 25, 30, 31, 34, 35];

        let sumaVisual = 0;
        let sumaAuditivo = 0;
        let sumaKinestesico = 0;

        for (let i = 0; i < resultados.length; i++) {
          const resultado = resultados[i];

          if (visual.includes(i + 1)) { // Suma para visual
            sumaVisual += resultado;
          } else if (auditivo.includes(i + 1)) { // Suma para auditivo
            sumaAuditivo += resultado;
          } else if (kinestesico.includes(i + 1)) { // Suma para kinestésico
            sumaKinestesico += resultado;
          }
        }


        //Encuentre el mayor de las tres sumas 
        let mayor = Math.max (sumaVisual, sumaAuditivo, sumaKinestesico);
        let mensaje ='';

        if (mayor === sumaVisual) {
          mensaje = 'El tipo predominante es Visual.';
        } else if (mayor === sumaAuditivo) {
          mensaje = 'El tipo predominante es Auditivo.';
        } else if (mayor === sumaKinestesico) {
          mensaje = 'El tipo predominante es Kinestésico.';
        }

        console.log('Suma Visual:', sumaVisual);
        console.log('Suma Auditivo:', sumaAuditivo);
        console.log('Suma Kinestésico:', sumaKinestesico);
        console.log('Mensaje:', mensaje);


        Swal.fire({
          icon:'success',
          title:'RESULTADO SRP',
          text: mensaje,
          confirmButtonText:'OK'
        }).then((result)=>{
          if (result.value) {
            localStorage.removeItem('questionnaireSelections');
            location.reload();
          }
        })
        
      
    }
   
  }


  }


}
