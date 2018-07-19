/* React imports */
import React from 'react';
import Expo from "expo";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import { Button } from 'native-base';

export default class Authors extends React.Component{
    static navigationOptions = ({ navigation }) => {
		headerLeft: {
            <Button
                onPress={() => this.props.navigation.navigate("SettingsScreen")}
            />
        } 
    }
    constructor(props) {
        super(props);
      }
    render (){
        return (
            <ScrollView style = {field.contentContainer}>
                <Hyperlink linkDefault = {true}>
                    <Text style = {field.title}>Terms of Service </Text>
                    <Text style = {field.baseText}>Last Updated: July 19, 2018 {"\n"}</Text>
                    <Text style = {field.baseText}>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the slugmarket.com website (the "Service") operated by Slug Market ("us", "we", or "our"). {"\n"}</Text>
                    <Text style = {field.baseText}>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. {"\n"}</Text>
                    <Text style = {field.baseText}>By accessing or using the Service you agree to be bound by these Terms. 
                        If you disagree with any part of the terms then you may not access the Service. 
                        This Terms of Service agreement for Slug Market is 
                        <Text style = {field.linkText}> "https://termsfeed.com/terms-conditions/generator/" </Text>
                        based on the Terms and Conditions from TermsFeed. {"\n"}
                    </Text>
                    <Text style = {field.titleText}>Accounts </Text>
                    <Text style = {field.baseText}>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. 
                        Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.{"\n"} 
                    </Text>
                    <Text style = {field.baseText}>You are responsible for safeguarding the password that you use to access the Service 
                        and for any activities or actions under your password, whether your password is with our Service or a third-party service.{"\n"} 
                    </Text>
                    <Text style = {field.baseText}>You agree not to disclose your password to any third party. 
                        You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. {"\n"}
                    </Text>
                    <Text style = {field.baseText}>Our Service may contain links to third-party web sites or services that are not owned or controlled by Slug Market. {"\n"}</Text>
                    <Text style = {field.baseText}>Slug Market has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. 
                        You further acknowledge and agree that Slug Market shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be 
                        caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services. {"\n"}
                    </Text>
                    <Text>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit. {"\n"}</Text>
                    <Text style = {field.titleText}>Termination </Text>
                    <Text style = {field.baseText}>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. {"\n"}</Text>
                    <Text style = {field.baseText}>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.{"\n"}</Text>
                    <Text style = {field.baseText}>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. {"\n"}</Text>
                    <Text style = {field.baseText}>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service. {"\n"}</Text>
                    <Text style = {field.baseText}>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability. {"\n"}</Text>
                    <Text style = {field.titleText}>Governing Law </Text>
                    <Text style = {field.baseText}>These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions. {"\n"}</Text>
                    <Text style = {field.baseText}>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
                    If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. 
                    These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service. {"\n"}
                    </Text>
                    <Text style = {field.titleText}>Changes </Text>
                    <Text style = {field.baseText}>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                     What constitutes a material change will be determined at our sole discretion. {"\n"}</Text>
                    <Text style = {field.baseText}>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. 
                    If you do not agree to the new terms, please stop using the Service. {"\n"}</Text>
                    <Text style = {field.titleText}>Contact Us </Text>
                    <Text style = {field.baseText}>If you have any questions about these Terms, please contact us.{"\n"}</Text>
                </Hyperlink>
            </ScrollView>
        )
    }
}

const field = StyleSheet.create({
    baseText: {
        fontSize: 14,
        fontFamily: 'San Francisco',
        paddingLeft: 5,
        paddingRight:5,
    },
    linkText: {
        fontSize: 14,
        color: 'blue',
        fontFamily: 'San Francisco',
        paddingLeft: 5,
        paddingRight:5,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'San Francisco',
        paddingLeft: 5,
        paddingRight:5,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'San Francisco',
        paddingLeft: 5,
        paddingRight:5,
    },
    contentContainer: {
        flex: 1,
        //marginTop: 20,
        //paddingTop: 10,
        paddingBottom: 30,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'white'
    },
})