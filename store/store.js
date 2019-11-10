import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjAxNGZiN2IyZTQ5MmQzOTEyMGE3NjhhYTJmNTdmYTFlMGY4NzMzNzdkZjQ4OTAxZGI2NmRkNDM4NjdkNTI2MDExNjI1ODdmNDRhOWFlOTJlIn0.eyJhdWQiOiIzIiwianRpIjoiMDE0ZmI3YjJlNDkyZDM5MTIwYTc2OGFhMmY1N2ZhMWUwZjg3MzM3N2RmNDg5MDFkYjY2ZGQ0Mzg2N2Q1MjYwMTE2MjU4N2Y0NGE5YWU5MmUiLCJpYXQiOjE1NzMxOTIwMjgsIm5iZiI6MTU3MzE5MjAyOCwiZXhwIjoxNjA0ODE0NDI4LCJzdWIiOiIxIiwic2NvcGVzIjpbImFwaSJdfQ.I8yW2MeCL9YdpQKyjx4fELoX2dFShwIiToDxDy4ljswlHuo9C5uj4VvAYWnC_qs-NdjphRpu1o15Q7SxF8VDQbVQpvE1Cr7AoGy-9Rl37_cuYMGpomaNlE1E40khrrsd69uwRKYNcELh1ie_ea3tKWtjs63xk8KkSQneCWL1zLToOsM-FkY66GNuTGl85pVevHX2rP6d13m_7ymkjuhUY-8RFhP8jiftytkmnPLZlxnMwjD-URtlKnoHrKeNiGchx1uWNlIa-7IcqmBx4i06AYdgdOZf_mFESOrAsk-MI1s-IuArJon4cplpLL9VaBjSJftu7zFqV8_Gp308otHTlan6pPp6WAP-QlD32vY_EX0WAQpMgdQU2wi48JjCZUsAVrBqUo1F_ABiE29nnswF744TtwEj1q8V_yyvuUb16Hck26sfN1Mah8zlXSm8A6LHroVo7oeVMYPsFySvJXe2bkZIuhU-fHdZqsk6bdZY01lTzDlPXMaHX2eGcjuF5pjvuIdwbRqZ71uFepldwe4uJdkIou1apgQYJGkwGn6JWg2EPypqYHyqDKw5fFtITrr27y41-wpR9-axJiDMB3evQaUbHGpJmlacrKsTIVb2KXpOxebe8E8LVa55mCFVoHv_tRNRsCgFNmFW5dXA9Hz-pD2XdkFgHwu48KebSDd9zeU',
		isLogin: false,
		needFresh: false
	},
	mutations: {
		saveToken(state, token) {
			state.token = token;
		},
		saveIsLogin(state, isLogin) {
			state.isLogin = isLogin;
		},
		saveNeedFresh(state, needFresh) {
			state.needFresh = needFresh;
		}
	},
	actions: {
	}
})

export default store
