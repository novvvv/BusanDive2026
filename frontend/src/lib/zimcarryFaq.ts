import type { L10n } from "@/lib/content";

/**
 * 짐캐리 짐배송 FAQ — data/zimcarry/zimcarry_faq.json 원문(ko) + ja/en 번역.
 * ko 원문은 수정하지 않는다. 수치·시각·요금은 세 언어 모두 원본 그대로 유지 (§7-③).
 */

export interface ZimcarryFaqItem {
  q: L10n;
  a: L10n;
}

export interface ZimcarryFaqSection {
  id: string;
  title: L10n;
  items: ZimcarryFaqItem[];
}

export const ZIMCARRY_FAQ_SECTIONS: ZimcarryFaqSection[] = [
  {
    id: "booking",
    title: { ko: "예약·변경·취소", ja: "予約・変更・キャンセル", en: "Booking & changes" },
    items: [
      {
        q: {
          ko: "짐캐리 배송예약 마감은 언제인가요?",
          ja: "配送予約の締め切りはいつですか？",
          en: "When is the booking deadline?",
        },
        a: {
          ko: "짐캐리 배송 예약은 다음과 같이 이루어집니다.\n1) 홈페이지 예약: 서비스 이용 당일 11시까지 홈페이지에서 예약할 수 있습니다(단, 인천공항점은 10시입니다).\n2) 당일 현장 접수: 짐캐리 매장에서 15시 이전(제주 14시 이전)까지 현장 접수 가능합니다(단, 인천공항점은 14시입니다).\n단, 당일 현장 접수의 경우 배송 서비스가 조기 마감되면 이용이 불가할 수 있습니다.",
          ja: "ジムキャリーの配送予約は次のとおりです。\n1) ホームページ予約：サービス利用当日11時までホームページで予約できます（仁川空港店は10時まで）。\n2) 当日店舗受付：ジムキャリー店舗で15時前（済州は14時前）まで受付できます（仁川空港店は14時まで）。\nただし当日受付は、配送サービスが早期に締め切られると利用できない場合があります。",
          en: "GimCarry delivery can be booked as follows.\n1) Website: book online until 11:00 on the day of service (10:00 for the Incheon Airport branch).\n2) Same-day in-store: accepted at GimCarry stores until 15:00 (14:00 in Jeju and at Incheon Airport).\nSame-day requests may be unavailable if the service closes early.",
        },
      },
      {
        q: {
          ko: "예약을 변경하고 싶어요.",
          ja: "予約を変更したいです。",
          en: "I want to change my booking.",
        },
        a: {
          ko: "숙소명을 오기재했거나 숙소 또는 이용 일자에 변동이 있으신 경우, 카카오톡 채널 '짐캐리'를 통해 서비스 이용 전날까지 변경 내용을 남겨주시면 예약 내용 수정을 도와드립니다.",
          ja: "宿泊先名の誤記入や、宿泊先・利用日に変更がある場合は、カカオトークチャンネル「짐캐리(ジムキャリー)」で利用前日までに変更内容をお知らせいただければ、予約内容の修正をお手伝いします。",
          en: "If you mistyped the stay name or your stay/date changed, leave the changes via the KakaoTalk channel 'GimCarry(짐캐리)' by the day before service and we'll update your booking.",
        },
      },
      {
        q: {
          ko: "예약을 취소/환불 받고 싶어요.",
          ja: "予約のキャンセル・払い戻しをしたいです。",
          en: "I want to cancel and get a refund.",
        },
        a: {
          ko: "짐캐리의 예약 취소/환불은 다음과 같이 이루어집니다.\n1) 홈페이지 예약: 서비스 이용 전날까지 카카오톡 채널 '짐캐리'를 통해 예약을 취소한 경우 결제 금액을 환불받을 수 있습니다. 서비스 이용 당일에는 취소가 가능하지만 환불은 불가합니다.\n2) 짐캐리 매장 현장접수: 영수증을 지참한 경우 취소/환불이 가능합니다. 단, 고객님의 수하물 운송이 시작되면 취소/환불이 불가합니다.\n3) 타 플랫폼 예약: 예약하신 플랫폼의 취소/환불 규정을 참고해주세요.",
          ja: "キャンセル・払い戻しは次のとおりです。\n1) ホームページ予約：利用前日までにカカオトークチャンネル「짐캐리(ジムキャリー)」でキャンセルすると決済金額が払い戻されます。利用当日はキャンセルできますが払い戻しはできません。\n2) 店舗受付：レシートをお持ちの場合はキャンセル・払い戻しできます。ただし手荷物の輸送開始後は不可です。\n3) 他プラットフォーム予約：予約したプラットフォームの規定をご確認ください。",
          en: "Cancellations/refunds work as follows.\n1) Website bookings: cancel via the KakaoTalk channel 'GimCarry(짐캐리)' by the day before service for a refund; same-day cancellation is possible but non-refundable.\n2) In-store bookings: refundable with your receipt, but not once your luggage is in transit.\n3) Other platforms: follow that platform's cancellation policy.",
        },
      },
      {
        q: {
          ko: "짐캐리 배송서비스는 제휴 호텔만 가능한가요?",
          ja: "配送サービスは提携ホテルのみ利用できますか？",
          en: "Is delivery limited to partner hotels?",
        },
        a: {
          ko: "짐캐리 배송서비스는 제휴호텔 이외에도 현재 홈페이지에 등록되어 있는 숙소에 숙박하시면 이용이 가능합니다. 이용 원하시는 숙소가 제휴호텔에 없다면 카카오톡 채널 '짐캐리'로 숙소등록 문의 바랍니다.\n에어비앤비/자택주소 배송은 짐캐리 사이트에서 주소지배송과 '코레일톡' 어플에서 이용 전날 오후 11시까지 예약 가능합니다. 상세주소와 보관장소를 정확히 알려주셔야 하며 설정하신 주소지로 수거/배송됩니다. 요금은 거리와 크기에 따라 달라질 수 있습니다.\n수거는 오전 11시까지 문앞에 두고 알림톡에서 사진촬영 부탁드리며, 배송은 당일 오후 4~7시 사이 직접 받으시거나 부재 시 문앞에 배송됩니다.\n인천공항 매장 이용 시 출발지에서 맡기는 시간 10시까지, 매장에 맡기는 시간 14시까지입니다.",
          ja: "提携ホテル以外でも、ホームページに登録されている宿泊先に滞在していれば利用できます。ご希望の宿泊先が見つからない場合は、カカオトークチャンネル「짐캐리(ジムキャリー)」まで宿泊先登録をお問い合わせください。\nAirbnb・自宅住所への配送は、ジムキャリーサイトの住所地配送と「코레일톡(KorailTalk)」アプリで利用前日23時まで予約できます。詳細な住所と保管場所を正確にお知らせいただき、設定した住所へ集荷・配送されます。料金は距離とサイズにより異なる場合があります。\n集荷は午前11時までに玄関前に置き、通知トークから写真撮影をお願いします。配送は当日16〜19時の間に直接受け取るか、不在時は玄関前に配達されます。\n仁川空港店利用時は、出発地に預けるのは10時まで、店舗に預けるのは14時までです。",
          en: "Delivery works not only with partner hotels but with any stay registered on our website. If your stay isn't listed, ask for registration via the KakaoTalk channel 'GimCarry(짐캐리)'.\nAirbnb/home-address delivery can be booked via address delivery on the GimCarry site or the 'KorailTalk(코레일톡)' app until 23:00 the day before. Provide the exact address and storage spot; luggage is collected from and delivered to that address, and fees vary by distance and size.\nFor collection, leave bags at the door by 11:00 and take a photo via alert-talk. Delivery arrives 16:00–19:00 the same day, or is left at the door if you're out.\nFor the Incheon Airport branch, drop-off is by 10:00 at the origin and 14:00 at the store.",
        },
      },
    ],
  },
  {
    id: "handling",
    title: { ko: "짐 맡기기·받기", ja: "預ける・受け取る", en: "Drop-off & delivery" },
    items: [
      {
        q: {
          ko: "[숙소->역/공항] 구간은 짐을 언제 가지러 오시나요?",
          ja: "[宿→駅/空港] 荷物はいつ集荷されますか？",
          en: "[Stay → station/airport] When is my luggage picked up?",
        },
        a: {
          ko: "[숙소->역/공항] 구간은 고객님께서 체크아웃 시간과 관계없이 11:00까지 숙소 프론트에 짐을 맡겨주셔야 하며, 맡기실 때 짐캐리 서비스 이용 예정이라고 말씀해주시면 저희가 픽업해서 역/공항으로 짐을 운송합니다.\n인천공항점은 예외로 숙소에 짐 맡기는 시간이 10시까지입니다.\n픽업된 짐은 오후 3시 이후부터 매장에서 찾으실 수 있으며, 영업시간 내에 찾아가지 못한 짐은 하루당 보관료에 따른 추가요금이 부과됩니다.",
          ja: "[宿→駅/空港] 区間は、チェックアウト時間に関係なく11:00までに宿のフロントに荷物を預け、ジムキャリーを利用する旨をお伝えください。私たちがピックアップし、駅/空港へ輸送します。\n仁川空港店は例外で、宿に預けるのは10時までです。\nピックアップされた荷物は午後3時以降に店舗で受け取れます。営業時間内に受け取れなかった荷物には、1日あたりの保管料に応じた追加料金がかかります。",
          en: "For the [stay → station/airport] leg, leave your luggage at the front desk by 11:00 regardless of checkout time and mention you're using GimCarry — we'll pick it up and move it to the station/airport.\n(Incheon Airport branch: by 10:00.)\nPicked-up luggage is available at the store from 15:00; bags not collected within business hours incur an extra daily storage fee.",
        },
      },
      {
        q: {
          ko: "[역/공항->숙소] 구간 이용 시 숙소에서 짐은 언제 받아볼 수 있나요?",
          ja: "[駅/空港→宿] 荷物はいつ宿で受け取れますか？",
          en: "[Station/airport → stay] When does my luggage arrive?",
        },
        a: {
          ko: "숙소 프론트에 16:00~19:00 사이에 순차적으로 도착합니다.\n숙소 도착시간은 운송 당일 교통 상황, 경로에 따라 상이하여 정확한 시간을 지정할 수 없는 점 양해 부탁드립니다.",
          ja: "宿のフロントに16:00〜19:00の間に順次到着します。\n到着時間は当日の交通状況や経路により異なり、正確な時間を指定できない点をご了承ください。",
          en: "Luggage arrives at your stay's front desk between 16:00 and 19:00.\nExact times can't be guaranteed as they depend on that day's traffic and routes.",
        },
      },
      {
        q: {
          ko: "사진 등록은 어떻게 하는 건가요?",
          ja: "写真登録はどうやりますか？",
          en: "How do I register luggage photos?",
        },
        a: {
          ko: "사진 등록 방법:\n1) 알림톡에서 예약조회 링크를 선택합니다.\n2) 짐배송 예약 내역에서 사진등록 버튼을 누릅니다.\n3) 맡기실 짐을 사진으로 촬영합니다.\n사진 등록 TIP: 가방이 2개 이상이라면 한번에 촬영해주세요. 등록된 사진은 추후 주소지 확인/가방 파손 등 확인 자료가 되므로 사진 미등록으로 인해 불이익이 발생할 수 있습니다.\n사진 등록에 실패했거나 변경을 원할 경우, 짐배송 서비스 문의를 통해 담당자에게 [성함, 예약 번호, 짐 사진]을 전달해 주세요.",
          ja: "写真登録の方法：\n1) 通知トークの予約照会リンクを選択します。\n2) 荷物配送の予約内訳で写真登録ボタンを押します。\n3) 預ける荷物を撮影します。\nTIP：バッグが2個以上ある場合は一度に撮影してください。登録した写真は住所確認やバッグ破損などの確認資料になるため、未登録の場合は不利益が生じることがあります。\n登録に失敗した場合や変更したい場合は、荷物配送サービスのお問い合わせから担当者に［氏名・予約番号・荷物の写真］をお送りください。",
          en: "How to register photos:\n1) Open the booking link in your alert-talk message.\n2) Tap the photo button in your delivery booking.\n3) Photograph the luggage you're dropping off.\nTip: shoot all bags in one photo if you have two or more. Photos serve as evidence for address checks and damage claims, so skipping them may work against you.\nIf upload fails or you need a change, send [name, booking number, luggage photo] to our staff via delivery-service support.",
        },
      },
      {
        q: {
          ko: "[해외서비스] 호텔에는 미리 연락해야 하나요?",
          ja: "[海外サービス] ホテルに事前連絡は必要ですか？",
          en: "[Int'l service] Do I need to contact the hotel in advance?",
        },
        a: {
          ko: "아니오. 고객님께서 호텔에 개인적으로 연락하실 필요 없습니다. 호텔에는 미리 연락할 필요 없이 서비스 이용 당일 호텔 프론트에 헬프카드를 보여주시고 맡기시면 됩니다.",
          ja: "いいえ。お客様がホテルに個別に連絡する必要はありません。事前連絡なしで、利用当日にホテルのフロントでヘルプカードを見せて預けるだけで大丈夫です。",
          en: "No — you don't need to contact the hotel yourself. Just show the help card at the front desk on the day of service and drop off your bags.",
        },
      },
      {
        q: {
          ko: "[해외서비스] 서비스 예약자명과 호텔 예약자명이 같아야 하나요?",
          ja: "[海外サービス] サービスとホテルの予約者名は同じ必要がありますか？",
          en: "[Int'l service] Must the service and hotel booking names match?",
        },
        a: {
          ko: "아니오. 서비스/호텔 예약자명이 달라도 예약이 가능합니다. 호텔로 배송은 반드시 예약자명과 함께 도착 호텔의 예약자명을 정확히 입력해주시면 됩니다.",
          ja: "いいえ。サービスとホテルの予約者名が違っても予約できます。ホテルへの配送は、予約者名と併せて到着ホテルの予約者名を正確に入力してください。",
          en: "No — the service and hotel booking names can differ. For hotel delivery, enter both your service booking name and the exact name on the hotel reservation.",
        },
      },
    ],
  },
  {
    id: "claims",
    title: { ko: "파손·분실 보상", ja: "破損・紛失の補償", en: "Damage & loss" },
    items: [
      {
        q: {
          ko: "짐이 파손되거나 분실되면 어떡하나요?",
          ja: "荷物が破損・紛失したらどうなりますか？",
          en: "What if my luggage is damaged or lost?",
        },
        a: {
          ko: "수하물의 분실 및 손실이 발생한 경우 짐캐리의 실수로 발생한 것을 입증해야 하며, 입증 시 보상의 최대 금액은 1,000,000원입니다.\n상세한 내용은 주문 신청 시 약관을 참고해주시기 바랍니다.",
          ja: "手荷物の紛失・損失が発生した場合、ジムキャリーの過失によるものであることの立証が必要で、立証時の補償上限は1,000,000원です。\n詳細は注文時の約款をご確認ください。",
          en: "If luggage is lost or damaged, it must be shown to be GimCarry's fault; the maximum compensation is 1,000,000원.\nSee the terms shown at booking for details.",
        },
      },
    ],
  },
];
