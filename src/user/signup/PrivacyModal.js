import React, { useState } from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Text, View, Button } from 'native-base'
import Modal from 'react-native-modal'

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    width: '96%',
    marginLeft: '2%',
    marginTop: '10%',
    marginBottom: '10%',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingTop: 25,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    width: '90%',
    marginLeft: '5%',
    alignItems: 'center',
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: (height * 0.7) - 30
  },
  title: {
    fontSize: 22,
    alignSelf: 'center'
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcP:{
    marginTop: 10,
    fontSize: 12
  },
  tcL:{
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcT:{
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    marginBottom: '2%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
})

export default PrivacyModal = props => {

  return (
    <Modal 
      style={styles.modal}
      animationIn='slideInDown'
      isVisible={props.showModal}
      deviceWidth={width}
      deviceHeight={height}
      onBackdropPress={() => props.toggleModal()}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Declaración de privacidad de DogPhin</Text>
        <ScrollView style={styles.tcContainer} >
          <Text style={styles.tcP}>DogPhin es una aplicación operada por Trade & Goods, SASU con un capital de 100 euros, registrada en el RCS de La Roche sur Yon bajo el número 749 937 819, cuya sede se encuentra en 2 l’Etanchet 85480 SAINT-HILAIRE-LE-VOUHIS (en lo sucesivo denominado "Trade & Goods", "nosotros" o "nuestro") que ofrece servicios comunitarios gratuitos entre usuarios.</Text>
          <Text style={styles.tcP}>Esta Declaración se refiere a:</Text>
          <Text style={styles.tcL}>1. Datos recopilados sobre usted.</Text>
          <Text style={styles.tcL}>2. Uso de sus datos.</Text>
          <Text style={styles.tcL}>3. Cuánto tiempo se almacenan sus datos.</Text>
          <Text style={styles.tcL}>4. Datos personales de menores. </Text>
          <Text style={styles.tcL}>5. Compartir sus datos.</Text>
          <Text style={styles.tcL}>6. Sus derechos y opciones.</Text>
          <Text style={styles.tcL}>7. Contáctenos.</Text>
          <Text style={styles.tcL}>8. Actualizaciones sobre esta declaración.</Text>

          <Text style={styles.tcT}>1. Datos recopilados sobre usted.</Text>
          <Text style={styles.tcP}>Como parte de la aplicación DogPhin, recopilamos y utilizamos su información personal para el único propósito de esta Declaración. Por datos personales, nos referimos a cualquier información que nos permita identificarle como usuario directa o indirectamente.</Text>
          <Text style={styles.tcP}>Se recopilará y procesará la siguiente información:</Text>
          <Text style={styles.tcL}>Información de la red, incluido el posición GPS GPS (la\tud y longitud)</Text>
          <Text style={styles.tcL}>Información de contacto, incluyendo su nombre, dirección, número de teléfono, dirección de correo electrónico y código postal, número de póliza de seguro de barco, número de teléfono de su contacto preferido, número de teléfono de capitanía del puerto o puerto de origen, número de registro de su barco.</Text>
          <Text style={styles.tcP}>Para ofrecer estos servicios, DogPhin necesita acceso a Internet, almacenamiento, información de ubicación. Los permisos de DogPhin se pueden administrar Parametros > Aplicaciones > DogPhin</Text>

          <Text style={styles.tcT}>2. Uso de sus datos.</Text>
          <Text style={styles.tcP}>Con el fin de proporcionarle servicios DogPhin y cumplir con las obligaciones contractuales, utilizaremos y procesaremos sus datos personales para los fines asociados a continuación, para la identificación del usuario y el servicio de ubicación. A menos que se indique lo contrario, estos servicios ya no estarán disponibles si se niega a recopilar y procesar su información personal necesaria.</Text>
          <Text style={styles.tcL}>1) Posición GPS en el mapa. Para mostrar su posición en el mapa, utilizaremos su posición GPS (la\tud y longitud). La información anterior se almacenará en nuestros servidores después de su uso con el fin de optimizar la aplicación DogPhin y las estadísticas de navegación global.</Text>
          <Text style={styles.tcL}>2) Lanzamiento de una alerta. Cuando emita una alerta, usaremos su posición GPS (la\tud y longitud) y su número de teléfono móvil registrado en su perfil. Esta información se compartirá con otros usuarios para permitir que la comunidad le ayude. Esta información se conservará en nuestros servidores después de su uso con el fin de optimizar la aplicación DogPhin, las estadísticas de navegación global y las estadísticas de incidentes de navegación.</Text>

          <Text style={styles.tcT}>3. Cuánto tiempo se almacenan sus datos.</Text>
          <Text style={styles.tcP}>Conservaremos sus datos personales durante el tiempo que sea necesario para los fines definidos en esta Declaración. Al final del período de retención, eliminaremos su información personal, a menos que se indique lo contrario en la ley y las regulaciones.</Text>
          <Text style={styles.tcP}>La información de posición GPS y las ac\vidades de alerta se mantendrán durante dos (2) años. Sus datos relacionados con la información de su perfil se conservarán hasta que se elimine su cuenta.</Text>
          
          <Text style={styles.tcT}>4. Datos personales de menores. </Text>
          <Text style={styles.tcP}>Esta aplicación está reservada para uso adulto. Si usted es menor de edad, su padre/tutor legal debe permitirle usarlo; y aceptar las condiciones de uso apropiadas. Los titulares de la patria potestad también deben tomar las medidas adecuadas para proteger a los menores, en particular controlando su uso de esta solicitud.</Text>

          <Text style={styles.tcT}>5. Compartir sus datos.</Text>
          <Text style={styles.tcP}>Mantenemos sus datos en los centros de datos ubicados aquí: ????????? .</Text>
          <Text style={styles.tcP}>Solo divulgamos sus datos en las siguientes circunstancias:</Text>
          <Text style={styles.tcL}>5.1 Divulgación en relación con requisitos legales o transferencias corporativas. </Text>
          <Text style={styles.tcL}>Trade & Goods puede divulgar sus datos en respuesta a un procedimiento judicial o a una solicitud de una autoridad competente de acuerdo con las leyes aplicables o como parte de un procedimiento o proceso judicial.</Text>
          <Text style={styles.tcL}>Sus datos también pueden ser divulgados en relación con una fusión, adquisición, venta de activos (como contratos de servicio) o al transferir el servicio a otra empresa.</Text>
          <Text style={styles.tcL}>5.2 Compartir con un tercero.</Text>
          <Text style={styles.tcL}>Con el fin de mejorar nuestros servicios y proporcionarle una mejor experiencia de usuario, recopilaremos su ID de usuario, datos de posición GPS, datos de alerta y analizaremos información sobre cómo interactúa con esta aplicación e información sobre el uso de características.</Text>
          <Text style={styles.tcL}>Sus datos de posición GPS y datos relacionados con las alertas recopiladas por nosotros se compartirán</Text>
          
          <Text style={styles.tcT}>6. Sus derechos y opciones.</Text>
          <Text style={styles.tcP}>Usted tiene los derechos y opciones:</Text>
          <Text style={styles.tcL}>6.1 Acceder, editar y eliminar cualquier dato de su perfil, a través de la aplicación DogPhin.</Text>
          <Text style={styles.tcL}>6.2 Retirada del consentimiento</Text>
          <Text style={styles.tcL}>1) Vaya a Configuración - Aplicaciones - Almacenamiento para administrar sus permisos.</Text>
          <Text style={styles.tcL}>2) Toque BORRAR DATOS para interrumpir la recopilación y el tratamiento de sus datos personales. </Text>
          <Text style={styles.tcL}>6.3 Tratamiento opuesto.</Text>
          <Text style={styles.tcL}>Si se opone al procesamiento de sus datos para su análisis, póngase en contacto con nosotros en tradegoods85@gmail.com.</Text>
          <Text style={styles.tcL}>Cuando solicite, especifique el alcance de esta solicitud y proporcione la dirección de correo electrónico o el número de teléfono que utilizó para iniciar sesión en su cuenta de DogPhin. Nos contactaremos con usted para verificar su identidad con el fin de responder a su solicitud.</Text>
          <Text style={styles.tcL}>Si su objeción es válida y ya no tenemos una base legal para continuar procesando sus datos, eliminaremos los datos correspondientes como parte de su objeción real.</Text>
          <Text style={styles.tcL}>Si es así, dependiendo de sus acciones anteriores, eliminaremos sus datos personales tan pronto como sea posible, y de acuerdo con los períodos de retención detallados en la Sección 3.</Text>
          <Text style={styles.tcL}>6.4 Limitación del tratamiento.</Text>
          <Text style={styles.tcL}>Si desea limitar el procesamiento de sus datos personales, póngase en contacto con nosotros en tradegoods85@gmail.com.</Text>
          <Text style={styles.tcL}>Cuando solicite, especifique el alcance y la base de esta solicitud, y proporcione la dirección de correo electrónico o el número de teléfono que u#lizó para iniciar sesión en su cuenta de DogPhin.</Text>
          <Text style={styles.tcL}>Nos contactaremos con usted para verificar su iden#dad con el fin de responder a su solicitud.</Text>
          <Text style={styles.tcL}>6.5 Directrices para el destino de sus datos personales post mortem</Text>
          <Text style={styles.tcL}>Usted tiene derecho a establecer pautas para la conservación, el borrado y la comunicación.</Text>
          <Text style={styles.tcL}>Si desea dar instrucciones sobre el destino de sus datos personales post-mortem, póngase en contacto con nosotros en tradegoods85@gmail.com.</Text>
          <Text style={styles.tcL}>6.6 Lista de oposición al servicio telefónico</Text>
          <Text style={styles.tcL}>También puede registrarse en la lista de oposición al servicio telefónico "???????" en el sitio web www.???????????.</Text>
          <Text style={styles.tcL}>6.7 Obtención de una copia de esta Declaración</Text>
          <Text style={styles.tcL}>Póngase en contacto con nosotros en tradegoods85@gmail.com para obtener una copia de esta Declaración.</Text>
          <Text style={styles.tcL}>6.8 Prospección comercial</Text>
          <Text style={styles.tcL}>Si ya no desea recibir un correo electrónico sobre nuestras acciones promocionales y asociaciones comerciales, puede hacerlo optando por no participar en el servicio, al final de un correo electrónico comercial, haciendo clic en "Cancelar suscripción".</Text>
          
          <Text style={styles.tcT}>7. Contáctenos.</Text>
          <Text style={styles.tcP}>Si desea ejercer sus derechos de privacidad, o si tiene problemas de privacidad para los que debe presentar una queja ante nuestro Responsable de Protección de Datos (RPD), o si desea consultar nuestro RPD con respecto a la protección de datos generales, póngase en contacto con nosotros en tradegoods85@gmail.com con su información de contacto y el propósito de su solicitud.</Text>
          <Text style={styles.tcP}>Si cree que Trade & Goods no procesan sus datos personales bajo los términos de esta Declaración o las leyes de protección de datos aplicables, puede presentar una queja ante su autoridad de protección de datos o ante la ¿?????????.</Text>
          <Text style={styles.tcT}>8. Actualizaciones sobre esta declaración.</Text>
          <Text style={styles.tcP}>Le invitamos a comprobar regularmente desde la configuración de la aplicación para ver si hay una nueva versión de esta declaración disponible, ya que la actualizamos de vez en cuando. En caso de cambios materiales en esta Declaración, o la forma en que procesamos sus datos, le notificaremos a través de mensajes, avisos del sitio web, correos electrónicos u otros dependiendo de la naturaleza del cambio,.</Text>
        </ScrollView>
        <View style={styles.buttonContainer} >
          <Button bordered transparent
            title="Ok" 
            onPress={() => props.toggleModal()}
          >
            <Text>Leido </Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}
