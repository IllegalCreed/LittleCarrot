/**
 * @providesModule UserAgreement
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {
} from 'antd-mobile';

export default class LoginPage extends Component {
    render() {
        return (
          <View style={styles.container}>
          <ScrollView>
            <Text>特别提示</Text>
            <Text style={styles.text}>小萝卜和它的朋友们科技有限公司在此特别提醒您（用户）在注册成为用户之前，请认真阅读本《用户协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。</Text>
            <Text style={styles.text}>本协议约定小萝卜礼模与用户之间关于“小萝卜礼模”软件服务（以下简称“服务”）的权利义务。“用户”是指注册、登录、使用本服务的个人。本协议可由小萝卜礼模随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本网站查阅最新版协议条款。在小萝卜礼模修改协议条款后，如果用户不接受修改后的条款，请立即停止使用小萝卜礼模提供的服务，用户继续使用小萝卜礼模提供的服务将被视为接受修改后的协议。</Text>
            <Text style={styles.text}>一、账号注册</Text>
            <Text style={styles.text}>1、用户在使用本服务前需要注册一个“小萝卜礼模”账号。“小萝卜礼模”账号应当使用手机号码绑定注册，请用户使用尚未与“小萝卜礼模”账号绑定的手机号码，以及未被小萝卜礼模根据本协议封禁的手机号码注册“小萝卜礼模”账号。小萝卜礼模可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。</Text>
            <Text style={styles.text}>2、“小萝卜礼模”系基于地理位置的移动社交产品，用户注册时应当授权小萝卜礼模公开及使用其地理位置信息方可成功注册“小萝卜礼模”账号。故用户完成注册即表明用户同意小萝卜礼模提取、公开及使用用户的地理位置信息。如用户需要终止向其他用户公开其地理位置信息，可自行设置为隐身状态。</Text>
            <Text style={styles.text}>3、鉴于“小萝卜礼模”账号的绑定注册方式，您同意小萝卜礼模在注册时将使用您提供的手机号码及/或自动提取您的手机号码及自动提取您的手机设备识别码等信息用于注册。</Text>
            <Text style={styles.text}>4、在用户注册及使用本服务时，小萝卜礼模需要搜集能识别用户身份的个人信息以便小萝卜礼模可以在必要时联系用户，或为用户提供更好的使用体验。小萝卜礼模搜集的信息包括但不限于用户的姓名、性别、年龄、出生日期、身份证号、地址、学校情况、公司情况、所属行业、兴趣爱好、常出没的地方、个人说明；小萝卜礼模同意对这些信息的使用将受限于第三条用户个人隐私信息保护的约束。</Text>
            <Text style={styles.text}>二、服务内容</Text>
            <Text style={styles.text}>1、本服务的具体内容由小萝卜礼模根据实际情况提供，包括但不限于授权用户通过其账号进行即时通讯、添加好友、加入群组、关注他人、发布留言。小萝卜礼模可以对其提供的服务予以变更，且小萝卜礼模提供的服务内容可能随时变更；用户将会收到小萝卜礼模关于服务变更的通知。</Text>
            <Text style={styles.text}>2、小萝卜礼模提供的服务包含免费服务与收费服务。用户可以通过付费方式购买收费服务，具体方式为：用户通过网上银行、支付宝或其他“小萝卜礼模”平台提供的付费途径支付一定数额的人民币购买“小萝卜礼模”平台的虚拟货币——小萝卜礼模币，然后根据小萝卜礼模公布的资费标准以小萝卜礼模币购买用户欲使用的收费服务，从而获得收费服务使用权限。对于收费服务，小萝卜礼模会在用户使用之前给予用户明确的提示，只有用户根据提示确认其同意按照前述支付方式支付费用并完成了支付行为，用户才能使用该等收费服务。支付行为的完成以银行或第三方支付平台生成“支付已完成”的确认通知为准。</Text>
            <Text style={styles.text}>三、用户个人隐私信息保护</Text>
            <Text style={styles.text}>1、用户在注册账号或使用本服务的过程中，可能需要填写或提交一些必要的信息，如法律法规、规章规范性文件（以下称“法律法规”）规定的需要填写的身份信息。如用户提交的信息不完整或不符合法律法规的规定，则用户可能无法使用本服务或在使用本服务的过程中受到限制。</Text>
            <Text style={styles.text}>2、个人隐私信息是指涉及用户个人身份或个人隐私的信息，比如，用户真实姓名、身份证号、手机号码、手机设备识别码、IP地址、用户聊天记录。非个人隐私信息是指用户对本服务的操作状态以及使用习惯等明确且客观反映在小萝卜礼模服务器端的基本记录信息、个人隐私信息范围外的其它普通信息，以及用户同意公开的上述隐私信息。</Text>
            <Text style={styles.text}>3、尊重用户个人隐私信息的私有性是小萝卜礼模的一贯制度，小萝卜礼模将采取技术措施和其他必要措施，确保用户个人隐私信息安全，防止在本服务中收集的用户个人隐私信息泄露、毁损或丢失。在发生前述情形或者小萝卜礼模发现存在发生前述情形的可能时，将及时采取补救措施。</Text>
            <Text style={styles.text}>4、小萝卜礼模未经用户同意不向任何第三方公开、 透露用户个人隐私信息。但以下特定情形除外：</Text>
            <Text style={styles.text}>(1) 小萝卜礼模根据法律法规规定或有权机关的指示提供用户的个人隐私信息；</Text>
            <Text style={styles.text}>(2) 由于用户将其用户密码告知他人或与他人共享注册帐户与密码，由此导致的任何个人信息的泄漏，或其他非因小萝卜礼模原因导致的个人隐私信息的泄露；</Text>
            <Text style={styles.text}>(3) 用户自行向第三方公开其个人隐私信息；</Text>
            <Text style={styles.text}>(4) 用户与小萝卜礼模及合作单位之间就用户个人隐私信息的使用公开达成约定，小萝卜礼模因此向合作单位公开用户个人隐私信息；</Text>
            <Text style={styles.text}>(5) 任何由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人隐私信息的泄露。</Text>
            <Text style={styles.text}>5、用户同意小萝卜礼模可在以下事项中使用用户的个人隐私信息：</Text>
            <Text style={styles.text}>(1) 小萝卜礼模向用户及时发送重要通知，如软件更新、本协议条款的变更；</Text>
            <Text style={styles.text}>(2) 小萝卜礼模内部进行审计、数据分析和研究等，以改进小萝卜礼模的产品、服务和与用户之间的沟通；</Text>
            <Text style={styles.text}>(3) 依本协议约定，小萝卜礼模管理、审查用户信息及进行处理措施；</Text>
            <Text style={styles.text}>(4) 适用法律法规规定的其他事项。</Text>
            <Text style={styles.text}>除上述事项外，如未取得用户事先同意，小萝卜礼模不会将用户个人隐私信息使用于任何其他用途。</Text>
            <Text style={styles.text}>6、小萝卜礼模重视对未成年人个人隐私信息的保护。小萝卜礼模将依赖用户提供的个人信息判断用户是否为未成年人。任何18岁以下的未成年人注册账号或使用本服务应事先取得家长或其法定监护人（以下简称"监护人"）的书面同意。除根据法律法规的规定及有权机关的指示披露外，小萝卜礼模不会使用或向任何第三方透露未成年人的聊天记录及其他个人隐私信息。除本协议约定的例外情形外，未经监护人事先同意，小萝卜礼模不会使用或向任何第三方透露未成年人的个人隐私信息。任何18岁以下的用户不得下载和使用小萝卜礼模通过小萝卜礼模软件提供的网络游戏。</Text>
            <Text style={styles.text}>7、用户确认，其地理位置信息为非个人隐私信息，用户成功注册“小萝卜礼模”账号视为确认授权小萝卜礼模提取、公开及使用用户的地理位置信息。用户地理位置信息将作为用户公开资料之一，由小萝卜礼模向其他用户公开。如用户需要终止向其他用户公开其地理位置信息，可随时自行设置为隐身状态。</Text>
            <Text style={styles.text}>8、为了改善小萝卜礼模的技术和服务，向用户提供更好的服务体验，小萝卜礼模或可会自行收集使用或向第三方提供用户的非个人隐私信息。</Text>
            <Text style={styles.text}>四、内容规范</Text>
            <Text style={styles.text}>1、本条所述内容是指用户使用本服务过程中所制作、上载、复制、发布、传播的任何内容，包括但不限于账号头像、名称、用户说明等注册信息及认证资料，或文字、语音、图片、视频、图文等发送、回复或自动回复消息和相关链接页面，以及其他使用账号或本服务所产生的内容。</Text>
            <Text style={styles.text}>2、用户不得利用“小萝卜礼模”账号或本服务制作、上载、复制、发布、传播如下法律、法规和政策禁止的内容：</Text>
            <Text style={styles.text}>(1) 反对宪法所确定的基本原则的；</Text>
            <Text style={styles.text}>(2) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</Text>
            <Text style={styles.text}>(3) 损害国家荣誉和利益的；</Text>
            <Text style={styles.text}>(4) 煽动民族仇恨、民族歧视，破坏民族团结的；</Text>
            <Text style={styles.text}>(5) 破坏国家宗教政策，宣扬邪教和封建迷信的；</Text>
            <Text style={styles.text}>(6) 散布谣言，扰乱社会秩序，破坏社会稳定的；</Text>
            <Text style={styles.text}>(7) 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</Text>
            <Text style={styles.text}>(8) 侮辱或者诽谤他人，侵害他人合法权益的；</Text>
            <Text style={styles.text}>(9) 不遵守法律法规底线、社会主义制度底线、国家利益底线、公民合法权益底线、社会公共秩序底线、道德风尚底线和信息真实性底线的“七条底线”要求的；</Text>
            <Text style={styles.text}>(10) 含有法律、行政法规禁止的其他内容的信息。</Text>
            <Text style={styles.text}>3、用户不得利用“小萝卜礼模”账号或本服务制作、上载、复制、发布、传播如下干扰“小萝卜礼模”正常运营，以及侵犯其他用户或第三方合法权益的内容：</Text>
            <Text style={styles.text}>(1) 含有任何性或性暗示的；</Text>
            <Text style={styles.text}>(2) 含有辱骂、恐吓、威胁内容的；</Text>
            <Text style={styles.text}>(3) 含有骚扰、垃圾广告、恶意信息、诱骗信息的；</Text>
            <Text style={styles.text}>(4) 涉及他人隐私、个人信息或资料的；</Text>
            <Text style={styles.text}>(5) 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；</Text>
            <Text style={styles.text}>(6) 含有其他干扰本服务正常运营和侵犯其他用户或第三方合法权益内容的信息。</Text>
            <Text style={styles.text}>五、使用规则</Text>
            <Text style={styles.text}>1、用户在本服务中或通过本服务所传送、发布的任何内容并不反映或代表，也不得被视为反映或代表小萝卜礼模的观点、立场或政策，小萝卜礼模对此不承担任何责任。</Text>
            <Text style={styles.text}>2、用户不得利用“小萝卜礼模”账号或本服务进行如下行为：</Text>
            <Text style={styles.text}>(1) 提交、发布虚假信息，或盗用他人头像或资料，冒充、利用他人名义的；</Text>
            <Text style={styles.text}>(2) 强制、诱导其他用户关注、点击链接页面或分享信息的；</Text>
            <Text style={styles.text}>(3) 虚构事实、隐瞒真相以误导、欺骗他人的；</Text>
            <Text style={styles.text}>(4) 利用技术手段批量建立虚假账号的；</Text>
            <Text style={styles.text}>(5) 利用“小萝卜礼模”账号或本服务从事任何违法犯罪活动的；</Text>
            <Text style={styles.text}>(6) 制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；</Text>
            <Text style={styles.text}>(7) 其他违反法律法规规定、侵犯其他用户合法权益、干扰“小萝卜礼模”正常运营或小萝卜礼模未明示授权的行为。</Text>
            <Text style={styles.text}>3、用户须对利用“小萝卜礼模”账号或本服务传送信息的真实性、合法性、无害性、准确性、有效性等全权负责，与用户所传播的信息相关的任何法律责任由用户自行承担，与小萝卜礼模无关。如因此给小萝卜礼模或第三方造成损害的，用户应当依法予以赔偿。</Text>
            <Text style={styles.text}>4、小萝卜礼模提供的服务中可能包括广告，用户同意在使用过程中显示小萝卜礼模和第三方供应商、合作伙伴提供的广告。除法律法规明确规定外，用户应自行对依该广告信息进行的交易负责，对用户因依该广告信息进行的交易或前述广告商提供的内容而遭受的损失或损害，小萝卜礼模不承担任何责任。</Text>
            <Text style={styles.text}>六、虚拟货币</Text>
            <Text style={styles.text}>1、小萝卜礼模将在“小萝卜礼模”平台发行虚拟货币，即小萝卜礼模币。小萝卜礼模币可用于购买“小萝卜礼模”平台的增值服务，包括但不限于表情服务及会员服务，除此外，不得用于其他任何用途。该等增值服务的价格均以小萝卜礼模币为单位，具体价格信息将由小萝卜礼模自行决定并在相关服务页面上显示。</Text>
            <Text style={styles.text}>2、小萝卜礼模币和人民币的兑换比例是10:1，兑换比例将由小萝卜礼模根据运营情况随时变更，并将在用户购买小萝卜礼模币的相关服务页面上显示。</Text>
            <Text style={styles.text}>3、用户默认已开通小萝卜礼模币账户，可进行小萝卜礼模币购买和消费。用户可在设置页面查询到小萝卜礼模币余额、购买记录和消费记录。小萝卜礼模币相关信息将不作为公开信息。</Text>
            <Text style={styles.text}>4、用户可以通过网上银行、支付宝或其他“小萝卜礼模”平台提供的充值途径为小萝卜礼模币账户进行充值。用户使用小萝卜礼模币购买相关收费服务后，可将相关收费服务赠与其他用户。</Text>
            <Text style={styles.text}>5、用户确认，小萝卜礼模币一经充值成功，除法律法规明确规定外，在任何情况下不能兑换为法定货币，不能转让他人。除法律法规明确规定外，小萝卜礼模币账户充值完成后，小萝卜礼模不予退款。</Text>
            <Text style={styles.text}>6、用户确认，小萝卜礼模币只能用于购买“小萝卜礼模”平台上的各类增值服务，任何情况下不得与小萝卜礼模以外的第三方进行小萝卜礼模币交易，亦不得在除“小萝卜礼模”平台以外的第三方平台（如淘宝）上进行交易；如违反前述约定，造成用户或第三方任何损失，小萝卜礼模不负任何责任，且如小萝卜礼模有理由怀疑用户的小萝卜礼模币帐户或使用情况有作弊或异常状况，小萝卜礼模将拒绝该用户使用小萝卜礼模币进行支付，直至按本协议约定采取相关封禁措施。</Text>
            <Text style={styles.text}>7、用户确认，除法律法规明确规定或本协议另有约定外，用户已购买的任何收费服务不能以任何理由退购（即退换成小萝卜礼模币或法定货币）或调换成其他服务。</Text>
            <Text style={styles.text}>七、帐户管理</Text>
            <Text style={styles.text}>1、 “小萝卜礼模”账号的所有权归小萝卜礼模所有，用户完成申请注册手续后，获得“小萝卜礼模”账号的使用权，该使用权仅属于初始申请注册人，禁止赠与、借用、租用、转让或售卖。小萝卜礼模因经营需要，有权回收用户的“小萝卜礼模”账号。</Text>
            <Text style={styles.text}>2、用户可以更改、删除“小萝卜礼模”帐户上的个人资料、注册信息及传送内容等，但需注意，删除有关信息的同时也会删除用户储存在系统中的文字和图片。用户需承担该风险。</Text>
            <Text style={styles.text}>3、用户有责任妥善保管注册账号信息及账号密码的安全，因用户保管不善可能导致遭受盗号或密码失窃，责任由用户自行承担。用户需要对注册账号以及密码下的行为承担法律责任。用户同意在任何情况下不使用其他用户的账号或密码。在用户怀疑他人使用其账号或密码时，用户同意立即通知小萝卜礼模。</Text>
            <Text style={styles.text}>4、用户应遵守本协议的各项条款，正确、适当地使用本服务，如因用户违反本协议中的任何条款，小萝卜礼模在通知用户后有权依据协议中断或终止对违约用户“小萝卜礼模”账号提供服务。同时，小萝卜礼模保留在任何时候收回“小萝卜礼模”账号、用户名的权利。</Text>
            <Text style={styles.text}>5、如用户注册“小萝卜礼模”账号后一年不登录，通知用户后，小萝卜礼模可以收回该账号，以免造成资源浪费，由此造成的不利后果由用户自行承担。</Text>
            <Text style={styles.text}>八、数据储存</Text>
            <Text style={styles.text}>1、小萝卜礼模不对用户在本服务中相关数据的删除或储存失败负责。</Text>
            <Text style={styles.text}>2、小萝卜礼模可以根据实际情况自行决定用户在本服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。用户可根据自己的需要自行备份本服务中的相关数据。</Text>
            <Text style={styles.text}>3、如用户停止使用本服务或本服务终止，小萝卜礼模可以从服务器上永久地删除用户的数据。本服务停止、终止后，小萝卜礼模没有义务向用户返还任何数据。</Text>
            <Text style={styles.text}>九、风险承担</Text>
            <Text style={styles.text}>1、用户理解并同意，“小萝卜礼模”仅为用户提供信息分享、传送及获取的平台，用户必须为自己注册账号下的一切行为负责，包括用户所传送的任何内容以及由此产生的任何后果。用户应对“小萝卜礼模”及本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。小萝卜礼模无法且不会对因用户行为而导致的任何损失或损害承担责任。</Text>
            <Text style={styles.text}>如果用户发现任何人违反本协议约定或以其他不当的方式使用本服务，请立即向小萝卜礼模举报或投诉，小萝卜礼模将依本协议约定进行处理。</Text>
            <Text style={styles.text}>2、用户理解并同意，因业务发展需要，小萝卜礼模保留单方面对本服务的全部或部分服务内容变更、暂停、终止或撤销的权利，用户需承担此风险。</Text>
            <Text style={styles.text}>十、知识产权声明</Text>
            <Text style={styles.text}>1、除本服务中涉及广告的知识产权由相应广告商享有外，小萝卜礼模在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权均归小萝卜礼模所有，但用户在使用本服务前对自己发布的内容已合法取得知识产权的除外。</Text>
            <Text style={styles.text}>2、除另有特别声明外，小萝卜礼模提供本服务时所依托软件的著作权、专利权及其他知识产权均归小萝卜礼模所有。</Text>
            <Text style={styles.text}>3、小萝卜礼模在本服务中所涉及的图形、文字或其组成，以及其他小萝卜礼模标志及产品、服务名称（以下统称“小萝卜礼模标识”），其著作权或商标权归小萝卜礼模所有。未经小萝卜礼模事先书面同意，用户不得将小萝卜礼模标识以任何方式展示或使用或作其他处理，也不得向他人表明用户有权展示、使用、或其他有权处理小萝卜礼模标识的行为。</Text>
            <Text style={styles.text}>4、上述及其他任何小萝卜礼模或相关广告商依法拥有的知识产权均受到法律保护，未经小萝卜礼模或相关广告商书面许可，用户不得以任何形式进行使用或创造相关衍生作品。</Text>
            <Text style={styles.text}>十一、法律责任</Text>
            <Text style={styles.text}>1、如果小萝卜礼模发现或收到他人举报或投诉用户违反本协议约定的，小萝卜礼模有权不经通知随时对相关内容，包括但不限于用户资料、聊天记录进行审查、删除，并视情节轻重对违规账号处以包括但不限于警告、账号封禁 、设备封禁 、功能封禁 的处罚，且通知用户处理结果。</Text>
            <Text style={styles.text}>2、因违反用户协议被封禁的用户，可以自行到 http://www.xiaorob.com/ 查询封禁期限，并在封禁期限届满后自助解封。其中，被实施功能封禁的用户会在封禁期届满后自动恢复被封禁功能。被封禁用户可向小萝卜礼模网站相关页面提交申诉，小萝卜礼模将对申诉进行审查，并自行合理判断决定是否变更处罚措施</Text>
            <Text style={styles.text}>3、用户理解并同意，小萝卜礼模有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应承担由此而产生的一切法律责任。</Text>
            <Text style={styles.text}>4、用户理解并同意，因用户违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户应当赔偿小萝卜礼模与合作公司、关联公司，并使之免受损害。</Text>
            <Text style={styles.text}>十二、不可抗力及其他免责事由</Text>
            <Text style={styles.text}>1、用户理解并确认，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，小萝卜礼模将努力在第一时间与相关单位配合，及时进行修复，但是由此给用户或第三方造成的损失，小萝卜礼模及合作单位在法律允许的范围内免责。</Text>
            <Text style={styles.text}>2、本服务同大多数互联网服务一样，受包括但不限于用户原因、网络服务质量、社会环境等因素的差异影响，可能受到各种安全问题的侵扰，如他人利用用户的资料，造成现实生活中的骚扰；用户下载安装的其它软件或访问的其他网站中含有“特洛伊木马”等病毒，威胁到用户的计算机信息和数据的安全，继而影响本服务的正常使用等等。用户应加强信息安全及使用者资料的保护意识，要注意加强密码保护，以免遭致损失和骚扰。</Text>
            <Text style={styles.text}>3、用户理解并确认，本服务存在因不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何技术、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险，因此导致的用户或第三方任何损失，小萝卜礼模不承担任何责任。</Text>
            <Text style={styles.text}>4、用户理解并确认，在使用本服务过程中存在来自任何他人的包括误导性的、欺骗性的、威胁性的、诽谤性的、令人反感的或非法的信息，或侵犯他人权利的匿名或冒名的信息，以及伴随该等信息的行为，因此导致的用户或第三方的任何损失，小萝卜礼模不承担任何责任。</Text>
            <Text style={styles.text}>5、用户理解并确认，小萝卜礼模需要定期或不定期地对“小萝卜礼模”平台或相关的设备进行检修或者维护，如因此类情况而造成服务在合理时间内的中断，小萝卜礼模无需为此承担任何责任，但小萝卜礼模应事先进行通告。</Text>
            <Text style={styles.text}>6、小萝卜礼模依据法律法规、本协议约定获得处理违法违规或违约内容的权利，该权利不构成小萝卜礼模的义务或承诺，小萝卜礼模不能保证及时发现违法违规或违约行为或进行相应处理。</Text>
            <Text style={styles.text}>7、用户理解并确认，对于小萝卜礼模向用户提供的下列产品或者服务的质量缺陷及其引发的任何损失，小萝卜礼模无需承担任何责任：</Text>
            <Text style={styles.text}>(1) 小萝卜礼模向用户免费提供的服务；</Text>
            <Text style={styles.text}>(2) 小萝卜礼模向用户赠送的任何产品或者服务。</Text>
            <Text style={styles.text}>8、在任何情况下，小萝卜礼模均不对任何间接性、后果性、惩罚性、偶然性、特殊性或刑罚性的损害，包括因用户使用“小萝卜礼模”或本服务而遭受的利润损失，承担责任（即使小萝卜礼模已被告知该等损失的可能性亦然）。尽管本协议中可能含有相悖的规定，小萝卜礼模对用户承担的全部责任，无论因何原因或何种行为方式，始终不超过用户因使用小萝卜礼模提供的服务而支付给小萝卜礼模的费用(如有)。</Text>
            <Text style={styles.text}>十三、服务的变更、中断、终止</Text>
            <Text style={styles.text}>1、鉴于网络服务的特殊性，用户同意小萝卜礼模有权随时变更、中断或终止部分或全部的服务（包括收费服务）。小萝卜礼模变更、中断或终止的服务，小萝卜礼模应当在变更、中断或终止之前通知用户，并应向受影响的用户提供等值的替代性的服务；如用户不愿意接受替代性的服务，如果该用户已经向小萝卜礼模支付的小萝卜礼模币，小萝卜礼模应当按照该用户实际使用服务的情况扣除相应小萝卜礼模币之后将剩余的小萝卜礼模币退还用户的小萝卜礼模币账户中。</Text>
            <Text style={styles.text}>2、如发生下列任何一种情形，小萝卜礼模有权变更、中断或终止向用户提供的免费服务或收费服务，而无需对用户或任何第三方承担任何责任：</Text>
            <Text style={styles.text}>(1) 根据法律规定用户应提交真实信息，而用户提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明；</Text>
            <Text style={styles.text}>(2) 用户违反相关法律法规或本协议的约定；</Text>
            <Text style={styles.text}>(3) 按照法律规定或有权机关的要求；</Text>
            <Text style={styles.text}>(4) 出于安全的原因或其他必要的情形。</Text>
            <Text style={styles.text}>十四、其他</Text>
            <Text style={styles.text}>1、小萝卜礼模郑重提醒用户注意本协议中免除小萝卜礼模责任和限制用户权利的条款，请用户仔细阅读，自主考虑风险。未成年人应在法定监护人的陪同下阅读本协议。</Text>
            <Text style={styles.text}>2、本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律。若用户和小萝卜礼模之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交小萝卜礼模住所地有管辖权的人民法院管辖。</Text>
            <Text style={styles.text}>3、本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。</Text>
            </ScrollView>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:10,
      flexDirection: "column",
    },
    text:{
        marginTop:10,
    }
})