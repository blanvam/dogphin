import React from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Text } from 'native-base'

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

export default PrivacySpanish = _ => {

    return (
      <ScrollView style={styles.tcContainer} >
          <Text style={styles.tcP}>DogPhin est une application exploitée par Trade & Goods, SASU au capital de 100€, enregistrée au RCS de La Roche sur Yon sous le numéro 749 937 819, dont le siège social est situé au 2 l’Etanchet 85480 SAINT-HILAIRE-LE-VOUHIS (ci-après dénommé "Trade & Goods", "nous" ou "notre") qui propose des services de communauté d’assistance gratuite entre plaisanciers.</Text>
          <Text style={styles.tcP}>Cette Déclaration aborde les éléments suivants :</Text>
          <Text style={styles.tcL}>1. Données recueillies sur vous</Text>
          <Text style={styles.tcL}>2. Utilisation de vos données</Text>
          <Text style={styles.tcL}>3. Durée de conservation de vos données</Text>
          <Text style={styles.tcL}>4. Données personnelles des mineurs</Text>
          <Text style={styles.tcL}>5. Partage de vos données</Text>
          <Text style={styles.tcL}>6. Vos droits et options</Text>
          <Text style={styles.tcL}>7. Nous contacter</Text>
          <Text style={styles.tcL}>8. Mises à jour de cette déclaration</Text>

          <Text style={styles.tcT}>1. Données recueillies sur vous</Text>
          <Text style={styles.tcP}>Dans le cadre de l'application DogPhin, nous recueillons et utilisons vos informations personnelles aux seules fins stipulées dans la présente Déclaration. Par données personnelles, nous entendons toute information nous permettant de vous identifier comme utilisateur directement ou indirectement.</Text>
          <Text style={styles.tcP}>Les informations suivantes seront recueillies et traitées :</Text>
          <Text style={styles.tcL}>• Informations réseau, incluant le positionnement GPS (latitude et longitude)</Text>
          <Text style={styles.tcL}>• Informations de contact, incluant votre nom, adresse, numéro de téléphone, adresse e-mail et code postal, numéro de police d’assurance de l’embarcation, numéro de téléphone de votre contact privilégié, numéro de téléphone du port d’attache ou de la Capitainerie du port d’attache, numéro d’immatriculation de votre embarcation.</Text>
          <Text style={styles.tcP}>Pour vous proposer ces services, DogPhin a besoin d'accéder à Internet, au stockage, aux informations de localisation. Les autorisations de DogPhin peuvent être gérées sous Paramètres > Applications > Applications > DogPhin > Autorisations.</Text>

          <Text style={styles.tcT}>2. Utilisation de vos données</Text>
          <Text style={styles.tcP}>Afin de vous fournir les services DogPhin et remplir les obligations contractuelles, nous utiliserons et traiterons vos données personnelles aux finalités associées ci-dessous, pour l'identification utilisateur et le service de localisation. Sauf indication contraire, ces services ne seront plus accessibles si vous refusez le recueil et le traitement de vos informations personnelles nécessaires.</Text>
          <Text style={styles.tcL}>1) Positionnement sur la carte. Afin de pouvoir afficher votre position sur la carte, nous utiliserons votre position GPS (latitude et longitude). Les informations précédentes seront conservées sur nos serveurs après utilisation à des fins d’optimisation de l’application DogPhin et de statistiques globales de navigation.</Text>
          <Text style={styles.tcL}>2) Lancement d’une alerte. Lorsque vous lancez une alerte, nous utiliserons votre position GPS (latitude et longitude) et votre numéro de téléphone mobile enregistré dans votre profil. Ces informations seront communiquées aux autres utilisateurs afin de permettre à la communauté de pouvoir vous porter assistance. Ces informations seront conservées sur nos serveurs après utilisation à des fins d’optimisation de l’application DogPhin, de statistiques globales de navigation et de statistiques d’incidents de navigation.</Text>

          <Text style={styles.tcT}>3. Durée de conservation de vos données</Text>
          <Text style={styles.tcP}>Nous ne conserverons vos données personnelles que le temps nécessaire aux fins définies dans la présente Déclaration. À l'issue du délai de conservation, nous supprimerons ou rendrons anonymes vos informations personnelles, sauf dispositions contraires de la loi et des réglementations en vigueur.</Text>
          <Text style={styles.tcP}>Les informations de positionnement et activités liées aux alertes seront conservés deux (2) ans. Vos données liées aux Informations de votre profil seront conservées jusqu’à la suppression de votre compte.</Text>
          
          <Text style={styles.tcT}>4. Données personnelles des mineurs</Text>
          <Text style={styles.tcP}>Cette application est réservée à l'usage des adultes. Si vous êtes mineur, votre parent/responsable légal doit vous autoriser à l'utiliser ; et accepter les conditions d'utilisation adéquates. Les titulaires de l’autorité parental doivent aussi prendre les mesures appropriées afin de protéger les mineurs, en particulier en contrôlant leur utilisation de cette application.</Text>

          <Text style={styles.tcT}>5. Partage de vos données</Text>
          <Text style={styles.tcP}>Nous conservons vos données dans les centres de données situés ici: London, Fráncfort, Zurich (Google Firebase: eur3, europe-west)</Text>
          <Text style={styles.tcP}>Nous ne communiquons vos données que dans les circonstances suivantes :</Text>
          <Text style={styles.tcL}>5.1 Divulgation en rapport à des exigences légales ou des transferts de société </Text>
          <Text style={styles.tcL}>Trade & Goods peut divulguer vos données en réponse à une procédure judiciaire ou à une demande d'une autorité compétente conformément aux lois applicables ou dans le cadre d'une procédure ou d'un processus judiciaire.</Text>
          <Text style={styles.tcL}>Vos données peuvent également être divulguées dans le cadre d'une fusion, d'une acquisition, d'une vente d'actifs (tels que les contrats de service) ou lors d'un transfert du service vers une autre société.</Text>
          <Text style={styles.tcL}>5.2 Partage avec un tiers</Text>
          <Text style={styles.tcL}>1) Afin d'améliorer nos services et de vous offrir une meilleure expérience utilisateur, nous recueillerons votre identifiant utilisateur, vos données de positionnement, vos données liées aux alertes, et analyserons les informations sur la façon dont vous interagissez avec cette application et les informations sur l'utilisation des fonctionnalités. </Text>
          <Text style={styles.tcL}>2) Votre données de positionnement et vos données liées aux alertes recueillies par nos soins seront partagés </Text>
          
          <Text style={styles.tcT}>6. Vos droits et options</Text>
          <Text style={styles.tcP}>Vous disposez des droits et des choix suivants :</Text>
          <Text style={styles.tcL}>6.1 Accès, modification et suppression de toutes les données de votre profil, via l’application DogPhin.</Text>
          <Text style={styles.tcL}>6.2 Retrait de consentement</Text>
          <Text style={styles.tcL}>1) Allez à Paramètres > Applications > Applications > DogPhin > Stockage pour gérer vos autorisations.</Text>
          <Text style={styles.tcL}>2) Touchez EFFACER LES DONNÉES pour interrompre le recueil et le traitement de vos données personnelles. </Text>
          <Text style={styles.tcL}>6.3 S'opposer au traitement</Text>
          <Text style={styles.tcL}>Si vous souhaitez vous opposer au traitement de vos données à des fins d'analyse, veuillez nous contacter à tradegoods85@gmail.com.</Text>
          <Text style={styles.tcL}>Lorsque vous faites votre demande, veuillez préciser la portée de cette demande et nous fournir l'adresse e-mail ou le numéro de téléphone que vous avez utilisé pour vous connecter à votre compte DogPhin. Nous vous contacterons pour vérifier votre identité afin de donner suite à votre demande.</Text>
          <Text style={styles.tcL}>Si votre opposition est valide et que nous n'avons plus de base légale pour poursuivre le traitement de vos données, nous effacerons les données correspondantes dans le cadre de votre opposition effective.</Text>
          <Text style={styles.tcL}>Le cas échéant, en fonction de vos actions ci-dessus, nous effacerons ou rendrons anonymes vos données personnelles dans les meilleurs délais, et conformément aux périodes de conservation détaillées dans la section 3.</Text>
          <Text style={styles.tcL}>6.4 Limitation de traitement</Text>
          <Text style={styles.tcL}>Si vous souhaitez limiter le traitement de vos données personnelles, veuillez nous contacter à tradegoods85@gmail.com.</Text>
          <Text style={styles.tcL}>Lorsque vous faites votre demande, veuillez préciser la portée et la base de cette demande, et nous fournir l'adresse e-mail ou le numéro de téléphone que vous avez utilisé pour vous connecter à votre compte DogPhin.</Text>
          <Text style={styles.tcL}>Nous vous contacterons pour vérifier votre identité afin de donner suite à votre demande.</Text>
          <Text style={styles.tcL}>6.5 Directives relatives au sort de vos données personnelles post-mortem</Text>
          <Text style={styles.tcL}>Vous avez le droit de définir des directives relatives à la conservation, à l'effacement et à la communication.</Text>
          <Text style={styles.tcL}>Si vous souhaitez donner des directives relatives au sort de vos données personnelles post-mortem, veuillez nous contacter à tradegoods85@gmail.com.</Text>
          <Text style={styles.tcL}>6.6 Liste anti-démarchage téléphonique</Text>
          <Text style={styles.tcL}>Vous avez par ailleurs la possibilité de vous inscrire sur la liste d'opposition au démarchage téléphonique "BLOCTEL" sur le site internet www.bloctel.gouv.fr.</Text>
          <Text style={styles.tcL}>6.7 Obtention d'une copie de cette Déclaration</Text>
          <Text style={styles.tcL}>Veuillez nous contacter à tradegoods85@gmail.com pour obtenir une copie de cette Déclaration.</Text>
          <Text style={styles.tcL}>6.8 Prospection commerciale</Text>
          <Text style={styles.tcL}>Si vous ne souhaitez plus recevoir d’email concernant nos actions promotionnelles et partenariats commerciaux, vous pouvez le faire en vous désabonnant du service, en fin d’email commercial, en cliquant sur « Me désabonner ». </Text>
          
          <Text style={styles.tcT}>7. Nous contacter</Text>
          <Text style={styles.tcP}>Si vous souhaitez exercer vos droits en rapport à la vie privée, ou si vous avez des questions relatives à la vie privée pour lesquelles vous devez déposer une plainte auprès de notre chargé de protection des données (DPO), ou si vous souhaitez consulter notre DPO concernant la protection générale des données, veuillez nous contacter à tradegoods85@gmail.com en indiquant vos coordonnées et l’objet de votre demande.</Text>
          <Text style={styles.tcP}>Si vous pensez que Trade & Goods ne traite pas vos données personnelles selon les termes de la présente Déclaration ou les lois de protection des données applicables, vous pouvez présenter une plainte auprès de votre autorité chargée de la protection des données ou auprès de la CNIL.</Text>
          <Text style={styles.tcT}>8. Mises à jour de cette déclaration</Text>
          <Text style={styles.tcP}>Nous vous invitons à vérifier régulièrement, depuis les paramètres de l'application, si une nouvelle version de cette Déclaration est disponible, car nous la mettons à jour de temps à autre. Dans le cas de changements matériels apportés à la présente Déclaration, ou à la façon dont nous traitons vos données, nous vous le notifierons via messages, avis de site Internet, e-mails ou autres selon la nature du changement.</Text>
      </ScrollView>
    )
}