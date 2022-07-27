/* CONFIG SECTION */

const cardCode = "UjbESARx";
const htmlAnchorId = "faq-anchor";

/* LOGIC SECTION */

const url = `https://api.trello.com/1/cards/${cardCode}`;

const fallbackText =
  "There hasn't been added any content yet. Please come back again later!";

fetch(url).then((res) => {
  res.json().then((cardData) => {
    var htmlAnchor = document.querySelector(`#${htmlAnchorId}`);
    htmlAnchor.innerHTML = processCardDataAndGetText(cardData);
  });
});

function processCardDataAndGetText(cardData) {
  var resHtml = `<p>${cardData.desc || fallbackText}</p>`;
  return resHtml;
}

const getFaqAccordeon = (question, answer) => `
<div class="elementor-element elementor-element-e6ed588 elementor-widget elementor-widget-toggle" data-id="e6ed588" data-element_type="widget" data-widget_type="toggle.default">
				<div class="elementor-widget-container">
			<style>/*! elementor - v3.6.5 - 27-04-2022 */
.elementor-toggle{text-align:left}.elementor-toggle .elementor-tab-title{font-weight:700;line-height:1;margin:0;padding:15px;border-bottom:1px solid #d4d4d4;cursor:pointer;outline:none}.elementor-toggle .elementor-tab-title .elementor-toggle-icon{display:inline-block;width:1em}.elementor-toggle .elementor-tab-title .elementor-toggle-icon svg{-webkit-margin-start:-5px;margin-inline-start:-5px;width:1em;height:1em}.elementor-toggle .elementor-tab-title .elementor-toggle-icon.elementor-toggle-icon-right{float:right;text-align:right}.elementor-toggle .elementor-tab-title .elementor-toggle-icon.elementor-toggle-icon-left{float:left;text-align:left}.elementor-toggle .elementor-tab-title .elementor-toggle-icon .elementor-toggle-icon-closed{display:block}.elementor-toggle .elementor-tab-title .elementor-toggle-icon .elementor-toggle-icon-opened{display:none}.elementor-toggle .elementor-tab-title.elementor-active{border-bottom:none}.elementor-toggle .elementor-tab-title.elementor-active .elementor-toggle-icon-closed{display:none}.elementor-toggle .elementor-tab-title.elementor-active .elementor-toggle-icon-opened{display:block}.elementor-toggle .elementor-tab-content{padding:15px;border-bottom:1px solid #d4d4d4;display:none}@media (max-width:767px){.elementor-toggle .elementor-tab-title{padding:12px}.elementor-toggle .elementor-tab-content{padding:12px 10px}}</style>		<div class="elementor-toggle" role="tablist">
							<div class="elementor-toggle-item">
					<div id="elementor-tab-title-2421" class="elementor-tab-title" data-tab="1" role="tab" aria-controls="elementor-tab-content-2421" aria-expanded="false">
												<span class="elementor-toggle-icon elementor-toggle-icon-right" aria-hidden="true">
															<span class="elementor-toggle-icon-closed"><i class="fas fa-angle-down"></i></span>
								<span class="elementor-toggle-icon-opened"><i class="elementor-toggle-icon-opened fas fa-angle-up"></i></span>
													</span>
												<a href="" class="elementor-toggle-title">${question}</a>
					</div>

					<div id="elementor-tab-content-2421" class="elementor-tab-content elementor-clearfix" data-tab="1" role="tabpanel" aria-labelledby="elementor-tab-title-2421"><p>${answer}</p><p><a href="https://www.heidenheim.dhbw.de/fileadmin/Heidenheim/Service_u_Einrichtungen/Servicezentrum_Studium_und_Lehre/Sekretariatsservice/Studierendenausweis/Merkblatt_Ausweisbilder_2022.pdf"><img loading="lazy" class="aligncenter wp-image-2444" src="http://3.studiguide-hdh.de/wp-content/uploads/2022/03/download-150x150.png" alt="Icon von Flaticon" width="51" height="51" srcset="https://3.studiguide-hdh.de/wp-content/uploads/2022/03/download-150x150.png 150w, https://3.studiguide-hdh.de/wp-content/uploads/2022/03/download-300x300.png 300w, https://3.studiguide-hdh.de/wp-content/uploads/2022/03/download.png 512w" sizes="(max-width: 51px) 100vw, 51px"></a></p></div>
				</div>
								</div>
				</div>
				</div>
`;
