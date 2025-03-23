from django.urls import path
from .views.users import get_users, create_user, user_detail
from .views.employees import get_employees, create_employee, employee_detail
from .views.expenses import get_expenses, create_expense, expense_detail
from .views.inventory import get_inventory, create_inventory_item, inventory_item_detail
from .views.inventory_issue_log import get_inventory_issue_logs, create_inventory_issue_log, inventory_issue_log_detail
from .views.sites import get_sites, create_site, site_detail,search
from .views.sites_expenses import get_site_expenses, create_site_expense, site_expense_detail
from .views.site_progress import  get_site_progress_updates, create_site_progress_update, site_progress_update_detail
from .views.login import login
from .views.signup import signup



from django.views.decorators.csrf import csrf_exempt
#
urlpatterns = [
     # User Endpoints
    path("users/", get_users, name='get_users'),
    path("users/create", create_user, name='create_user'),
    path("users/<int:pk>", user_detail, name='user_detail'),
#
    # Employee Endpoints
    path("employees/", get_employees, name='get_employees'),
    path("employees/create", create_employee, name='create_employee'),
    path("employees/<int:pk>", employee_detail, name='employee_detail'),

    # Expenses Endpoints
    path("expenses/", get_expenses, name='get_expenses'),
    path("expenses/create", create_expense, name='create_expense'),
    path("expenses/<int:pk>", expense_detail, name='expense_detail'),

    # Inventory Endpoints
    path("inventory/", get_inventory, name='get_inventory'),
    path("inventory/create", create_inventory_item, name='create_inventory_item'),
    path("inventory/<int:pk>", inventory_item_detail, name='inventory_item_detail'),

  

    # InventoryIssueLog Endpoints
    path("inventory-issue-logs/", get_inventory_issue_logs, name='get_inventory_issue_logs'),
    path("inventory-issue-logs/create", create_inventory_issue_log, name='create_inventory_issue_log'),
    path("inventory-issue-logs/<int:pk>", inventory_issue_log_detail, name='inventory_issue_log_detail'),

    # Site Endpoints
    path("sites/", get_sites, name='get_sites'),
    path("sites/create", create_site, name='create_site'),
    path("sites/<str:pk>", site_detail, name='site_detail'),
    path("search/",search,name='search_sites'),
    # path("search-sites",csrf_exempt(search_sites, name='search_sites')),

    # SiteExpenses Endpoints
    path("site-expenses/", get_site_expenses, name='get_site_expenses'),
    path("site-expenses/create", create_site_expense, name='create_site_expense'),
    path("site-expenses/<int:pk>", site_expense_detail, name='site_expense_detail'),

    # SiteProgressUpdate Endpoints
    path("site-progress-updates/", get_site_progress_updates, name='get_site_progress_updates'),
    path("site-progress-updates/create", create_site_progress_update, name='create_site_progress_update'),
    path("site-progress-updates/<int:pk>", site_progress_update_detail, name='site_progress_update_detail'),

    path("login/",login,name='login'),
    path("signup/",signup,name='signup'),
   
 ]
