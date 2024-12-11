# backend/main.py
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from playwright.async_api import async_playwright
import asyncio

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BrowserManager:
    def __init__(self):
        self.playwright = None
        self.browser = None

    async def initialize(self):
        if not self.playwright:
            self.playwright = await async_playwright().start()
            self.browser = await self.playwright.chromium.launch(
                headless=False
            )

    async def setup_claude(self, session_token):
        await self.initialize()
        context = await self.browser.new_context()
        page = await context.new_page()
        
        # Set Claude session cookie
        await context.add_cookies([{
            'name': 'sessionKey',
            'value': session_token,
            'domain': 'claude.ai',
            'path': '/',
        }])
        
        # Navigate to Claude
        await page.goto('https://claude.ai')
        return page

    async def setup_chatgpt(self, session_token):
        await self.initialize()
        context = await self.browser.new_context()
        page = await context.new_page()
        
        # Set ChatGPT session cookie
        await context.add_cookies([{
            'name': '__Secure-next-auth.session-token',
            'value': session_token,
            'domain': 'chat.openai.com',
            'path': '/',
        }])
        
        # Navigate to ChatGPT
        await page.goto('https://chat.openai.com')
        return page

browser_manager = BrowserManager()

@app.on_event("startup")
async def startup_event():
    await browser_manager.initialize()

@app.post("/setup")
async def setup_browsers(data: dict):
    try:
        if data.get('claudeToken'):
            await browser_manager.setup_claude(data['claudeToken'])
        if data.get('chatgptToken'):
            await browser_manager.setup_chatgpt(data['chatgptToken'])
        return {"status": "success"}
    except Exception as e:
        print(f"Error : {e}")
        return {"status": "error", "message": str(e)}

@app.on_event("shutdown") 
async def shutdown_event():
    if browser_manager.browser:
        await browser_manager.browser.close()
    if browser_manager.playwright:
        await browser_manager.playwright.stop()
    